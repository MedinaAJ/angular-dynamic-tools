import { Component, Input } from '@angular/core';
import { WarningMessage } from '../../warning-message.types';

@Component({
  selector: 'dynamic-warning-layout',
  templateUrl: './dynamic-warning-layout.component.html'
})
export class DynamicWarningLayoutComponent {
  @Input() data: WarningMessage;

}
