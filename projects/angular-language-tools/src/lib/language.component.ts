import {Component, Input} from '@angular/core';

@Component({
  selector: 'lang',
  template: `
    <ng-container *transloco="let t">{{ t(str) }}</ng-container>`,
})
export class LanguageComponent {
  @Input() str: string = '';
}
