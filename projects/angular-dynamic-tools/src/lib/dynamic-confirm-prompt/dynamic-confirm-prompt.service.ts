import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DynamicConfirmPromptComponent } from './dynamic-confirm-prompt.component';
import { PromptOptions, PromptResponse } from './dynamic-confirm-prompt.interface';
import { DynamicDialogComponent } from '../dynamic-dialog/dynamic-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DynamicConfirmPromptService {
  constructor(private dialog: MatDialog) {}

  open(options: Partial<PromptOptions>, dialogConfig: MatDialogConfig = {}): Observable<PromptResponse> {
    const config: MatDialogConfig = {
      width: '500px',
      disableClose: false,
      data: {
        childComponent: DynamicConfirmPromptComponent,
        inputData: { options }
      },
      ...dialogConfig
    };

    const dialogRef = this.dialog.open(DynamicDialogComponent, config);
    return dialogRef.afterClosed();
  }
}
