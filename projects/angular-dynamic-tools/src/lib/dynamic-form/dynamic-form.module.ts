import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from "@angular/material/input";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './dynamic-form.component';
import { StepperDynamicFormComponent } from './stepper-dynamic-form/stepper-dynamic-form.component';
import { MatStepperModule } from "@angular/material/stepper";
// import { FileManagerModule } from 'app/modules/admin/documents/components/file-manager/file-manager.module';
import { LanguageModule } from '../language/language.module';
import { FileManagerWrapperComponent } from './file-manager-wrapper/file-manager-wrapper.component';



@NgModule({
  declarations: [
    DynamicFormComponent,
    StepperDynamicFormComponent,
    FileManagerWrapperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatStepperModule,
    // FileManagerModule,
    LanguageModule
  ],
  exports: [
    DynamicFormComponent,
    StepperDynamicFormComponent,
  ]
})
export class DynamicFormModule { }
