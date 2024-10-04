import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicWarningLayoutComponent } from './components/dynamic-warning-layout/dynamic-warning-layout.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageModule } from '../language/language.module';



@NgModule({
  declarations: [
    DynamicWarningLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    LanguageModule
  ],
  exports: [
    DynamicWarningLayoutComponent
  ]
})
export class DynamicWarningLayoutModule { }
