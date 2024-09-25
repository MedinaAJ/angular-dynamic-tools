import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LanguageSelectorComponent} from './language-selector.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [LanguageSelectorComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    LanguageSelectorComponent
  ]
})
export class LanguageSelectorModule {
}
