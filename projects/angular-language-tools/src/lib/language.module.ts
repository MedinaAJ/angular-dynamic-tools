import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LanguageComponent} from './language.component';
import {TranslocoRootModule} from './transloco/transloco.module';


@NgModule({
  declarations: [
    LanguageComponent
  ],
  imports: [
    CommonModule,
    TranslocoRootModule,
  ],
  exports: [
    LanguageComponent
  ]
})
export class LanguageModule {
}
