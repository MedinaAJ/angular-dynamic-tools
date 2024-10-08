import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvancedDynamicFormComponent } from './avanced-dynamic-form.component';

describe('AvancedDynamicFormComponent', () => {
  let component: AvancedDynamicFormComponent;
  let fixture: ComponentFixture<AvancedDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvancedDynamicFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvancedDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
