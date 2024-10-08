import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StepperDynamicForm } from './stepper-dynamic-form.types';
import { FormGroup } from '@angular/forms';
import { StepperDynamicFormService } from './stepper-dynamic-form.service';
import { DynamicFormService } from '../dynamic-form.service';
import { FieldChangeEvent } from '../dynamic-form.types';

@Component({
  selector: 'stepper-dynamic-form',
  templateUrl: './stepper-dynamic-form.component.html',
  styleUrls: ['./stepper-dynamic-form.component.scss']
})
export class StepperDynamicFormComponent implements OnInit {

  @Input() stepperForm!: StepperDynamicForm;
  @Input() data: any = {};
  
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() fieldChange: EventEmitter<FieldChangeEvent> = new EventEmitter<FieldChangeEvent>();

  form!: FormGroup;

  /**
   * Constructor
   */
  constructor(
    private formGenerator: StepperDynamicFormService,
    public _DynamicFormService:  DynamicFormService,
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On Init lifecycle hook
   */
  ngOnInit(): void {
    // Render the form
    this.renderForm();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Assign the tenant default values
   */
  renderForm(): void {
    this.form = this.formGenerator.generateForm(this.stepperForm);

    // Assign the tenant values to the form
    this.form.patchValue(this.data);
  }

  /**
   * Save the form
   * @returns void
   */ 
  save(): void {
    this.formSubmit.emit(this.form.value);
  }

  /**
   * Change event handler
   * @param event 
   */
  onChange(event: FieldChangeEvent): void {
    if(event.field.changeEvent)
      this.fieldChange.emit(event);
  }
}
