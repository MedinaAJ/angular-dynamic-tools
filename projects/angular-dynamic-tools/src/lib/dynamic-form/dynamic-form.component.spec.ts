import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormField, DynamicFormType } from './dynamic-form.types';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;
  let formBuilder: FormBuilder;

  const formFields: DynamicFormField[] = [
    {
      type: DynamicFormType.Text,
      label: 'Name',
      name: 'name',
      required: true,
    },
    {
      type: DynamicFormType.Date,
      label: 'Date',
      name: 'date',
      required: true,
    },
    {
      type: DynamicFormType.DateTimeLocal,
      label: 'Datetime',
      name: 'datetime',
      required: true,
    },
    {
      type: DynamicFormType.Checkbox,
      label: 'Interests',
      name: 'interests',
      options: [
        { label: 'Football', value: 'football' },
        { label: 'Tennis', value: 'tennis' },
        { label: 'Swimming', value: 'swimming' },
      ],
    },
    {
      type: DynamicFormType.Select,
      label: 'Country',
      name: 'country',
      options: [
        { label: 'USA', value: 'usa' },
        { label: 'Canada', value: 'canada' },
        { label: 'Mexico', value: 'mexico' },
      ],
    },
    {
      type: DynamicFormType.Radio,
      label: 'Gender',
      name: 'gender',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
      ],
    },
    {
      type: DynamicFormType.Textarea,
      label: 'Comments',
      name: 'comments',
      required: false,
    },
    {
      type: DynamicFormType.Group,
      label: 'Address',
      name: 'address',
      fields: [
        {
          type: DynamicFormType.Text,
          label: 'Street',
          name: 'street',
          required: true,
        },
        {
          type: DynamicFormType.Number,
          label: 'Number',
          name: 'number',
          required: true,
        },
        {
          type: DynamicFormType.Group,
          label: 'nextLevel',
          name: 'nextlevel',
          fields: [
            {
              type: DynamicFormType.Text,
              label: 'Street2',
              name: 'street2',
              required: true,
            },
            {
              type: DynamicFormType.Number,
              label: 'Number2',
              name: 'number2',
              required: true,
            },
          ],
        },
      ],
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [DynamicFormComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.fields = formFields;
    fixture.detectChanges();
  });

  it('should create the component', async () => {
    await expect(component).toBeTruthy();
  });

  it('should create a form group with the correct controls', async () => {
    const expectedFormGroup = formBuilder.group({
      name: [null, Validators.required],
      date: [null, Validators.required],
      datetime: [null, Validators.required],
      interests: [null, Validators.required],
      country: [null, Validators.required],
      gender: [null, Validators.required],
      comments: [null],
      address: formBuilder.group({
        street: [null, Validators.required],
        number: [null, Validators.required],
        nextlevel: formBuilder.group({
          street2: [null, Validators.required],
          number2: [null, Validators.required],
        }),
      }),
    });

    await expect(component.form.value).toEqual(expectedFormGroup.value);
  });

  it('should emit the form value when submitted', async () => {
    const formValue = {
      name: 'John',
      date: '2023-06-12',
      datetime: '2023-06-12T10:00',
      interests: ['football', 'tennis'],
      country: 'usa',
      gender: 'male',
      comments: 'Some comments',
      address: {
        street: 'Main Street',
        number: 123,
        nextlevel: {
          street2: 'Secondary Street',
          number2: 456,
        },
      },
    };

    spyOn(component.formSubmit, 'emit');

    component.form.setValue(formValue);
    component.onSubmit();

    expect(component.formSubmit.emit).toHaveBeenCalledWith(formValue);
  });
});
