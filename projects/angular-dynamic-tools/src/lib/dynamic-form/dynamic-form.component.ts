import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit, ChangeDetectorRef, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormField, DynamicFormType, FieldChangeEvent } from './dynamic-form.types';
import { DynamicFormService } from './dynamic-form.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnChanges, OnInit {

  // Input properties
  @Input() fields: DynamicFormField[] = [];
  @Input() form!: FormGroup;
  @Input() first?: boolean = true;
  @Input() showSubmit?: boolean = true;
  @Input() buttonLabel: string | undefined;
  @Input() fileManagerComponent?: any;

  // Output property
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();
  @Output() fieldChange: EventEmitter<FieldChangeEvent> = new EventEmitter<FieldChangeEvent>();

  /**
   * Constructor
   */
  constructor(
    public _DynamicFormService: DynamicFormService,
    private changeDetectorRef: ChangeDetectorRef,
    private injector: Injector
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * OnInit lifecycle hook
   */
  ngOnInit(): void {
    // Create the form if it's the first load and fields are provided
    if (this.first && this.fields && !this.form) {
      this.form = this._DynamicFormService.createFormGroup(this.fields);

      // Force a new change detection cycle
      this.changeDetectorRef.detectChanges();
    }
  }

  /**
   * OnChanges lifecycle hook
   */
  ngOnChanges(changes: SimpleChanges) {
    // Create the form if there are changes in the fields and a form doesn't exist yet
    if (changes.fields && !this.form) {
      this.form = this._DynamicFormService.createFormGroup(this.fields);

      // Force a new change detection cycle
      this.changeDetectorRef.detectChanges();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Submit the form
   */
  onSubmit() {
    // Emit the formSubmit event with the form value
    this.formSubmit.emit(this.form.value);

    // Force a new change detection cycle
    this.changeDetectorRef.detectChanges();
  }
  
  /**
   * Change event handler
   * @param event 
   */
  onChange(event: FieldChangeEvent): void {
    if(event.field.changeEvent)
      this.fieldChange.emit(event);
  }

  /**
   * Update the image field
   * @param field
   * @param form
   * @param event
   */
  updateImage(field: DynamicFormField, form: FormGroup, event: string | null) {
    // Update the form value
    form.patchValue({
      [field.name]: event
    });
  }

  /**
   * Create an injector for the file-manager wrapper component
   * @param field
   * @returns
   */
  createInjector(field: DynamicFormField): Injector {
    return Injector.create({
      providers: [
        { provide: 'value_id', useValue: this.form.get(field.name)?.value },
        { provide: 'selected', useValue: (event: any) => this.updateImage(field, this.form, event) }
      ],
      parent: this.injector
    });
  }

  /**
   * Legacy method to implement rules in the form for hidden fields
   * @param field
   * @returns
   */ 
  gethidden(field: DynamicFormField): boolean {
    if(field.type == DynamicFormType.Hidden) return true;
    if(!field.hidden) return false;
    if (field.hidden === 'true') return true;
    else if (field.hidden === 'false') return false;
    const firstLetter = field.hidden.charAt(0);
    if (firstLetter === '!') return this.form.value[field.hidden.substring(1)];
    else return !this.form.value[field.hidden];
  }
  
}
