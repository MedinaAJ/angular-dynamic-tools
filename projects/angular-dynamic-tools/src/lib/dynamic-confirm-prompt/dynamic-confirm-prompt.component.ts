import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, ValidatorFn } from '@angular/forms';
import { PromptOptions } from './dynamic-confirm-prompt.interface';

@Component({
  selector: 'dynamic-confirm-prompt',
  template: `
    <div class="modal bg-white p-6">
      <div class="flex items-center">
        <mat-icon *ngIf="options.icon" class="mr-2">{{ options.icon }}</mat-icon>
        <h1 class="text-xl font-bold">{{ options.title }}</h1>
      </div>
      <p *ngIf="options.description" class="text-gray-600">{{ options.description }}</p>

      <ng-container *ngIf="options.inputType">
        <input 
          [type]="options.inputType"
          [formControl]="inputControl"
          class="border border-gray-300 rounded p-2 mt-4 w-full"
        />
      </ng-container>

      <div class="mt-4 flex space-x-2">
        <button mat-stroked-button color="primary" (click)="onConfirm()" [disabled]="inputControl.invalid">
          <mat-icon *ngIf="options.saveButtonIcon" class="mr-1">{{ options.saveButtonIcon }}</mat-icon>
          {{ options.saveButtonText || 'Save' }}
        </button>
        <button *ngIf="options.showCancelButton" mat-stroked-button color="warn" (click)="onCancel()">
          <mat-icon *ngIf="options.cancelButtonIcon" class="mr-1">{{ options.cancelButtonIcon }}</mat-icon>
          {{ options.cancelButtonText || 'Cancel' }}
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .modal { /* additional styling as needed */ }
    `
  ]
})
export class DynamicConfirmPromptComponent {
  @Input() options: PromptOptions = {
    title: 'Are you sure?',
    saveButtonText: 'Save',
    cancelButtonText: 'Cancel',
    showCancelButton: true
  };
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  inputControl: FormControl;

  constructor(private fb: FormBuilder) {
    this.inputControl = new FormControl(null);
  }

  ngOnInit() {
    // Configuramos el valor por defecto y los validadores
    this.inputControl = new FormControl(this.options.defaultValue || null, this.options.validators || []);
    this.inputControl.updateValueAndValidity();
  }

  onConfirm() {
    if (this.inputControl.valid || !this.options.inputType) {
      const dataToSend = this.options.inputType ? this.inputControl.value : true;
      this.save.emit(dataToSend);
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
