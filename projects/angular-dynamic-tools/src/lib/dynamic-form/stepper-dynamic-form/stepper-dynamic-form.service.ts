import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { StepperDynamicForm, StepperDynamicFormStep } from './stepper-dynamic-form.types';
import { DynamicFormService } from '../dynamic-form.service';

@Injectable({
  providedIn: 'root'
})
export class StepperDynamicFormService {

  /**
   * Constructor
   */
  constructor(
    private _DynamicFormService: DynamicFormService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Generate the form
   * @param formConfig
   * @returns {FormGroup}
   */ 
  generateForm(formConfig: StepperDynamicForm): FormGroup {
    let rootForm: FormGroup = {} as FormGroup;
    formConfig.steps.forEach(step => {
      if(step.parent_id == undefined)
        rootForm = this._DynamicFormService.createFormGroup(step.fields);
    });
    formConfig.steps.forEach(step => {
      if(step.parent_id && this.isNotChildren(step, formConfig.steps))
        this.addStepToForm(rootForm, step, formConfig.steps);
    });
    return rootForm;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Add a step to the form
   * @param rootForm
   * @param step
   * @param steps
   */ 
  private addStepToForm(rootForm: FormGroup, step: StepperDynamicFormStep | undefined, steps: StepperDynamicFormStep[]): void {
    if(step) {
      const stepForm = this._DynamicFormService.createFormGroup(step?.fields);
      if (step?.children) {
          step.children.forEach(childStepId => {
              const childStep: StepperDynamicFormStep | undefined = steps.find(s => s.id == childStepId);
              this.addStepToForm(stepForm, childStep, steps);
          });
      }
      if(step)
        rootForm.addControl(step.control, stepForm);
    }
  }

  /**
   * Check if the step is not a children
   * @param step
   * @param steps
   * @returns {boolean}
   */ 
  private isNotChildren(step: StepperDynamicFormStep, steps: StepperDynamicFormStep[]): boolean {
    return steps.filter(s => s.children).find(s => s?.children?.includes(step.id)) == undefined;
  }
}
