import { Component, Input, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'lang',
  template: `
    <ng-container *ngIf="loaded">
      <ng-container *transloco="let t">{{ t(str) }}</ng-container>
    </ng-container>
  `,
})
export class LanguageComponent implements OnInit {
  @Input() str: string = '';
  loaded = false;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit() {
    this.translocoService.langChanges$.subscribe(() => {
      this.loaded = true; // Esperar hasta que Transloco esté listo
    });
  }
}
