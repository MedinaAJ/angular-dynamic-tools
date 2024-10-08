import { DynamicFormField } from "../dynamic-form.types";

export interface StepperDynamicForm {
    steps: StepperDynamicFormStep[];
    config: StepperDynamicFormConfig;
}

export interface StepperDynamicFormStep {
    id: string;
    parent_id?: string;
    control: string;
    title: string;
    fields: DynamicFormField[];
    children?: string[];
}

export interface StepperDynamicFormConfig {
    linear: boolean;
    orientation: 'horizontal' | 'vertical';
    class?: string;
}

