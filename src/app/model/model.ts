import { FormGroup, ValidatorFn, Validators } from "@angular/forms";

export interface Option {
  key: string;
  value: string;
}

export interface Dictionary<T> {
  [Key: string]: T;
}

export class WizardFormControl {
  type: string = 'text';
  validations: ValidatorFn[] = [];
  errors: Dictionary<string> = {};
  placeholder: string = 'place holder';
  options?: Option[] = [];
}

export type WizardFormStep = Dictionary<WizardFormControl>;

const PROVINCE_LIST = [
  { value: 'province 1', key: 'p1' },
  { value: 'province 2', key: 'p2' },
  { value: 'province 3', key: 'p3' }
];

const CITY_LIST = [
  { value: 'city 1', key: 'c1' },
  { value: 'city 2', key: 'c2' },
  { value: 'city 3', key: 'c3' }
];

const DATA_STEP_1: WizardFormStep = {
  'firstName': { type: 'text', validations: [Validators.required], errors: { 'required': 'This field can not be left blank' }, placeholder: 'First Name' },
  'lastName': { type: 'text', validations: [], errors: {}, placeholder: 'Last Name' },
  'socialSecurityNumber': { type: 'text', validations: [], errors: {}, placeholder: 'Social Security Number' },
};

const DATA_STEP_2: WizardFormStep = {
  'file': { type: 'file', validations: [Validators.required], errors: { 'required': 'This field can not be left blank' }, placeholder: 'Proof' },
};

const DATA_STEP_3: WizardFormStep = {
  'province': { type: 'select',options: PROVINCE_LIST, validations: [], errors: {}, placeholder: 'Province' },
  'city': { type: 'select', options: CITY_LIST, validations: [], errors: {}, placeholder: 'City' },
  'address': { type: 'textarea', validations: [], errors: {}, placeholder: 'Full Address' },
};

const STEP_ITEMS: Map<string, WizardFormStep> = new Map([
  ['Personal Information', DATA_STEP_1],
  ['Attachment', DATA_STEP_2],
  ['Contact Info', DATA_STEP_3],
  ['Review & Submit', {}]
]);

export { STEP_ITEMS }
