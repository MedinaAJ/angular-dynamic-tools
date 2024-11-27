import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicListComponent } from './dynamic-list.component';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterModule } from './filter/filter.module'; 
import { LanguageModule } from '../language/language.module';

@NgModule({
  declarations: [
    DynamicListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatMenuModule,
    MatIconModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    LanguageModule,
    FilterModule
  ],
  exports: [
    DynamicListComponent
  ]
})
export class DynamicListModule { }
