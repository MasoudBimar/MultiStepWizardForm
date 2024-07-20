import { CommonModule } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Dictionary, STEP_ITEMS, WizardFormControl, WizardFormStep } from './model/model';
import { WizardFormComponent } from './wizard-form/wizard-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, WizardFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'WizardForm';
  formContent:  Map<string, WizardFormStep> = new Map();
  formData: unknown;
  activeStepIndex: number = 0;

  ngOnInit(): void {
    this.formContent = STEP_ITEMS;
    this.formData = {};
  }

  onFormSubmit(formData: unknown): void {
    this.formData = formData;

    // post form data here
    console.log(JSON.stringify(this.formData));
  }
  constructor(private renderer: Renderer2, private fb: FormBuilder) {

  }

}
