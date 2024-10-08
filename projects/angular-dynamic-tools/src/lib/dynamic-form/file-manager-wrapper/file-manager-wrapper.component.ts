import { Component, Input } from '@angular/core';

@Component({
  selector: 'file-manager-wrapper',
  template: `
    <ng-container *ngIf="fileManagerComponent">
      <ng-container *ngComponentOutlet="fileManagerComponent; injector: injector"></ng-container>
    </ng-container>
  `
})
export class FileManagerWrapperComponent {
  @Input() fileManagerComponent!: any; // Componente dinámico que recibimos
  @Input() injector: any; // Injector que permitirá pasar inputs y outputs dinámicamente
}
