import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicConfirmPromptComponent } from './dynamic-confirm-prompt.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [DynamicConfirmPromptComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [DynamicConfirmPromptComponent],
})
export class DynamicConfirmPromptModule {}
