import { ValidatorFn } from "@angular/forms";

export interface PromptOptions {
    title: string;
    description?: string;
    icon?: string;
    saveButtonText?: string;
    saveButtonIcon?: string;
    cancelButtonText?: string;
    cancelButtonIcon?: string;
    showCancelButton?: boolean;
    inputType?: string;
    defaultValue?: any;
    validators?: ValidatorFn[];
}

export interface PromptResponse<T = any> {
    event: 'save' | 'cancel';
    data: T | undefined;
}