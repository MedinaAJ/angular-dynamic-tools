import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [
    MatMenuModule,
    MatIconModule
  ]
})
export class MaterialModule {}
