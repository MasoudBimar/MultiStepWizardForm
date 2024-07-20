import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { WizardFormControl, WizardFormStep } from '../model/model';
import { FormatTitlePipe } from '../pipes/form-title.pipe';

@Component({
  selector: 'app-wizard-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormatTitlePipe,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FileUploadComponent
  ],

  providers: [provideNativeDateAdapter()],
  templateUrl: './wizard-form.component.html',
  styleUrl: './wizard-form.component.scss'
})
export class WizardFormComponent implements OnInit {
  @Input() formContent: Map<string, WizardFormStep> = new Map<string, WizardFormStep>();

  @Output() readonly formSubmit: EventEmitter<any> = new EventEmitter<any>();

  activeStepIndex: number = 0;
  lastActiveStepIndex: number = 0;
  currentFormContent: WizardFormStep[] = [];
  formData: any;
  formFields: Array<Array<keyof WizardFormControl>> = [];
  masterFormFields: string[] = [];
  stepItems: string[] = [];
  masterForm: FormGroup[] = [];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private _cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.stepItems = Array.from(this.formContent.keys());
    this.formContent.forEach((value: WizardFormStep) => {
      this.currentFormContent.push(value);
      this.formFields.push(Object.keys(value) as Array<keyof WizardFormControl>); // holds string values for each field of all steps
      this.masterForm.push(this.buildForm(value)); // holds all form groups
    });
  }

  // build separate FormGroups for each form
  buildForm(wfc: WizardFormStep): FormGroup {

    const formDetails = Object.keys(wfc).reduce((obj, key: string) => {
      return { ...obj, [key]: ["", wfc[key].validations] };
    }, {});
    return this._formBuilder.group(formDetails);
  }

  onFileChange(event: any, field: string): void {
    const reader = new FileReader();

    if (event.target?.files && event.target?.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.masterForm[this.activeStepIndex].patchValue({
          [field]: reader.result
        });

        // need to run CD since file load runs outside of zone
        this._cd.markForCheck();
      };
    } else{
      this.masterForm[this.activeStepIndex].patchValue({
        [field]: undefined
      });
      this._cd.markForCheck();
    }
  }

  // get validation error messages per error, per field
  getValidationMessage(formIndex: number, formFieldName: string): string {
    const formControl = this.masterForm[formIndex].get(formFieldName);
    if (formControl) {
      const formErrors = formControl.errors;
      const errorMessages = this.currentFormContent[formIndex][formFieldName]?.errors;
      if (formErrors) {
        const validationError = errorMessages[Object.keys(formErrors)[0]];
        return validationError;
      }
    }
    return '';
  }

  goToStep(step: string): void {
    this.activeStepIndex = step === "prev" ? this.activeStepIndex - 1 : this.activeStepIndex + 1;
    this.lastActiveStepIndex = Math.max(this.activeStepIndex, this.lastActiveStepIndex);
    this.setFormPreview();
  }

  jumpToStep(step: number): void {
    this.activeStepIndex = step;

    this.setFormPreview();
  }

  setFormPreview(): void {
    this.formData = this.masterForm.reduce(
      (masterForm, currentForm) => ({ ...masterForm, ...currentForm.value }),
      {}
    );

    this.masterFormFields = Object.keys(this.formData);
  }

  onFormSubmit(): void {
    this.formSubmit.emit(this.formData);
  }

  trackByFn(index: number): number {
    return index;
  }
}
