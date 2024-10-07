import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { DynamicListComponent } from './dynamic-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LanguageModule } from '../language/language.module';
import { TranslocoRootModule } from '../language/transloco/transloco.module';

describe('DynamicListComponent', () => {
  let component: DynamicListComponent;
  let fixture: ComponentFixture<DynamicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicListComponent],
      imports: [FormsModule, MatIconModule, LanguageModule, HttpClientTestingModule, TranslocoRootModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', async () => {
    await expect(component).toBeTruthy();
  });

  it('should filter rows based on search text', async () => {
    const data = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Adam', age: 35 }
    ];
    component.config = {
      title: 'Test Title',
      description: 'Test Description',
      filter: true,
      actions: [],
      rows: [
        { property: 'name', label: 'Name' },
      ],
      data: data
    };
    fixture.detectChanges();

    component.searchText = 'John';
    fixture.detectChanges();

    let filteredRows = fixture.debugElement.nativeElement.querySelectorAll('.row-list');
    // update filteredRow removing hidden tag
    filteredRows = Array.from(filteredRows).filter((row: any) => !row.hidden);
    await expect(filteredRows.length).toBe(1);
  });
});
