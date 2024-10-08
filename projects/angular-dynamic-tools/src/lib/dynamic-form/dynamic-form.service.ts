import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicFormField, DynamicFormType } from './dynamic-form.types';
import { StepperDynamicFormStep } from './stepper-dynamic-form/stepper-dynamic-form.types';

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  /**
   * Constructor
   * @param formBuilder The form builder
   */ 
  constructor(
    private formBuilder: FormBuilder
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Dynamic Form Layout methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create a form group
   * @param fields The fields to create form controls for
   * @returns The created form group
   */
  createFormGroup(fields: DynamicFormField[]): FormGroup {
    const group = this.formBuilder.group({});
    fields.forEach(field => {
      if (field.type === DynamicFormType.Group) {
        // If the field is a group, recursively create a form group for its fields
        group.addControl(field.name, this.createFormGroup(field.fields || []));
      } else {
        const defaultValue = (field.value || field.value=="" ? field.value : null);
        // If the field is not a group, add a form control to the form group
        group.addControl(field.name, this.formBuilder.control(defaultValue, field.required ? Validators.required : null));
      }
    });
    return group;
  }

  /**
   * Cast a form group
   * @param form The form to cast
   * @returns The casted form group
   */
  castFormGroup(form: any): FormGroup {
    return form as FormGroup;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Stepper Form Layout methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Cast a form group
   * @param form The form to cast
   * @returns The casted form group
   */
  getFormGroup(form: FormGroup, step: StepperDynamicFormStep, steps: StepperDynamicFormStep[]): FormGroup {
    if(step.parent_id == null) return form;
    else {
      const controls: string[] = this.getControls(step, steps);
      let currentForm = form;
      controls.forEach(control => {
        currentForm = currentForm.get(control) as FormGroup;
      });
      //const parentStep = steps.find(s => s.id == step.parent_id);
      //return this.getFormGroup(form.get(parentStep.control), parentStep, steps);
      // Tienes que recuperar el form group correspondiente
      // Ejemplo:  <dynamic-form [fields]="companyInfoAddressFormFields" [form]="_DynamicFormService.castFormGroup(form.get('companyInfo').get('address'))" [showSubmit]="false"></dynamic-form>
      return currentForm;
    }
  }

  getControls(step: StepperDynamicFormStep, steps: StepperDynamicFormStep[]): string[] {
    // Si el paso no tiene padre, devuelvo solo el control de este paso
    if (!step.parent_id) {
        return [];
    }
    // Encuentro el paso padre en la lista de pasos
    const parentStep = steps.find(s => s.id === step.parent_id);
    // Si el paso padre no se encuentra, devuelvo solo el control de este paso
    if (!parentStep) {
        return [step.control];
    }
    // Si el paso padre se encuentra, llamo a la función recursivamente para obtener la ruta de control hasta el paso padre y agrego el control de este paso al final
    return [...this.getControls(parentStep, steps), step.control];
  } 

  // -----------------------------------------------------------------------------------------------------
  // @ Adapter old form methods
  // -----------------------------------------------------------------------------------------------------

  renderFormFieldsWithAdapter(form: {controls?: any[], typeDataSend?: string}): { formFields: DynamicFormField[], buttonLabel: string | undefined, formIdentificator: string | undefined } {
    let buttonLabel: string | undefined = undefined;
    const formFields: DynamicFormField[] = [];
    let formIdentificator: string | undefined = undefined;

    form.controls?.forEach((element: any) => {
      if(element.name == 'FormIdentificator') formIdentificator = element.value;
      else if(element.type != 'button') 
        formFields.push({
          type: this.renderType(element),
          label: element.label,
          name: element.name,
          required: element.validators?.required,
          changeEvent: form.typeDataSend == 'sendToOnfocus',
          class: 'col-12 ' + (element.type == 'label' ? element.classes : ''),
          value: element.value+"",
          hidden: element.hidden,
          options: element.options,
        });
      else 
        buttonLabel = element.label;
    });

    return { formFields, buttonLabel, formIdentificator };
  }
  
  renderType(element: any): DynamicFormType {
    if(element.type == 'hidden' || (element.hidden == 'true')) return DynamicFormType.Hidden;
    else if(element.type == 'checkbox') return DynamicFormType.Checkbox;
    else if(element.type == 'button') return DynamicFormType.Button;
    else if(element.type == 'select') return DynamicFormType.Select;
    else if(element.type == 'radio') return DynamicFormType.Radio;
    else if(element.type == 'password') return DynamicFormType.Password;
    else if(element.type == 'date') return DynamicFormType.Date;
    else if(element.type == 'label') return DynamicFormType.Label;
    else if(element.type == 'textarea') return DynamicFormType.Textarea;
    else if(element.type == 'email') return DynamicFormType.Email;

    return DynamicFormType.Text;
  }
}
