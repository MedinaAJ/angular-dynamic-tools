import { FormGroup } from "@angular/forms";

export interface DynamicFormField {
    type: DynamicFormType;
    label: string;
    description?: string;
    prefix_icon?: string;
    name: string;
    value?: any;
    required?: boolean;
    options?: DynamicFormOption[]; // for select, radio
    fields?: DynamicFormField[]; // for group
    show?: boolean; // for password input
    changeEvent?: boolean; // Change event 
    class?: string;
    hidden?: string;
}

export interface DynamicFormOption {
    label: string;
    value: string;
}

export interface FieldChangeEvent {
    field: DynamicFormField;
    event: Event;
    form: FormGroup;
    index: number;
  }


export enum DynamicFormType {
    Group = 'group',
    Text = 'text',
    Number = 'number',
    Button = 'button',
    Label = 'label',
    Checkbox = 'checkbox',
    Select = 'select',
    Radio = 'radio',
    Password = 'password',
    Hidden = 'hidden',
    Date = 'date',
    DateTimeLocal = 'datetime-local',
    Textarea = 'textarea',
    Email = 'email',
    File = 'file',
    Color = 'color',
    Range = 'range',
    Search = 'search',
    Tel = 'tel',
    Url = 'url',
    Week = 'week',
    Month = 'month',
    Time = 'time',
    Image = 'image',
    MultipleSelect = 'multiple-select',
}