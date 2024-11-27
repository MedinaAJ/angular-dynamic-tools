import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ButtonFilter, DynamicListConfig, DynamicListEvent, DynamicListRow, DynamicListRowButton, DynamicListRowButtonGroup, DynamicListRowCheckbox, DynamicListRowLink, FilterConfig, MongoOperator, ValueType } from './dynamic-list.types';
import { MatSort } from '@angular/material/sort';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatMenu } from '@angular/material/menu';

@Component({
  selector: 'dynamic-list',
  templateUrl: './dynamic-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicListComponent {
  @ViewChildren(MatMenu) menus!: QueryList<MatMenu>;

  getMenuByIndex(index: number): MatMenu | undefined {
    return this.menus.toArray()[index];
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('dataTable', { static: false }) dataTable: ElementRef;

  @Input() config!: DynamicListConfig;

  @Output() event: EventEmitter<DynamicListEvent> = new EventEmitter<DynamicListEvent>();

  searchText: string = '';
  selectAll: boolean = false;

  constructor(
    public sanitized: DomSanitizer,
    public changeDetectorRef: ChangeDetectorRef
  ) { }

  /**
   * Apply filters
   */
  applyFilters(data: FilterConfig[]) {
    this.event.emit({ action: 'filter', value: data });
  }

  /**
   * Save current filters
   */
  saveCurrentFilters(data: ButtonFilter) {
    this.event.emit({ action: 'saveFilters', value: data });
  }

  /**
   * filters btn remove
   */
  filtersBtnRemove(data: ButtonFilter) {
    this.event.emit({ action: 'removeFilter', value: data });
  }

  /**
   * Sort configuration changed
   */
  sortData(): void {
    const active = this.sort.active;
    const direction = this.sort.direction;

    this.event.emit({ action: 'sort', value: { active, direction } });
  }

  /**
   * Pagination configuration changed
   */
  pageChanged(event: any): void {
    this.config.pagination.currentPage = event.pageIndex + 1;
    this.config.pagination.itemsPerPage = event.pageSize;
    this.event.emit({ action: 'pagination', value: this.config.pagination });
  }

  /**
   * Handles the selection of all rows.
   */
  selectAllRows(): void {
    this.selectAll = !this.selectAll;
    this.config.data.forEach(row => row.selected = this.selectAll);
  }

  /**
   * Emits the event with the action and the selected row.
   */
  bulkAction(action: string): void {
    this.event.emit({ action, value: this.config.data.filter(row => row.selected) });
  }

  /**
   * Checks if any row is selected.
   */
  hasAnySelectedRow(): boolean {
    return this.config.data.some(row => row.selected);
  }

  /**
   * Handles the action triggered in the dynamic list.
   * Emits the event with the action and optional value.
   * @param action The action string.
   * @param value The optional value associated with the action.
   */
  action(action: string, value?: any): void {
    this.event.emit({ action, value });
  }

  /**
   * Retrieves the value from an object using a dot-separated path.
   * @param obj The object from which to retrieve the value.
   * @param path The dot-separated path to the desired value.
   * @returns The value retrieved from the object.
   */
  getProperty(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc ? acc[key] : '', obj);
  }

  /**
   * Renders a row value.
   * @param row The row to render.
   * @param dataRow The data row to render.
   * @returns The rendered value.
   */
  renderCellValue(row: any, dataRow: any): string {
    if (row.renderValue && row.renderValue(dataRow) !== null) {
      return row.renderValue(dataRow);
    } else {
      switch (row.pipe) {
        case 'date':
          if(this.getProperty(dataRow, row.property))
            return new Date(this.getProperty(dataRow, row.property)).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
          else return '';
        case 'amount': {
            const amount = this.getProperty(dataRow, row.property);
            const formattedAmount = new Intl.NumberFormat('es-ES', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(amount.value);
            return `${formattedAmount} ${amount.unit}`;
        }
        case 'currency': {
            const valor = this.getProperty(dataRow, row.property);
            if (valor !== null && valor !== undefined) {
              const formattedCurrency = new Intl.NumberFormat('es-ES', {
                style: 'currency',
                currency: 'EUR'
              }).format(valor);
              return formattedCurrency;
            }
            return '';
        }
        default:
          return this.getProperty(dataRow, row.property);
      }
    }
  }

  /**
   * Verifica si una fila coincide con el texto de búsqueda.
   * @param dataRow La fila de datos a verificar.
   * @returns `true` si la fila coincide con el texto de búsqueda, de lo contrario, `false`.
   */
  isRowMatchingFilter(dataRow: any): boolean {
    if (!this.searchText) {
      return true;
    }

    const searchLowerCase = this.searchText.toLowerCase();
    const rowData = JSON.stringify(dataRow).toLowerCase();

    return rowData.includes(searchLowerCase);
  }

  /**
   * Verifica si una fila es de tipo checkbox.
   * @param row La fila a verificar.
   * @returns `true` si la fila es de tipo checkbox, de lo contrario, `false`.
   */ 
  isCheckboxRow(row: DynamicListRow | DynamicListRowCheckbox): row is DynamicListRowCheckbox {
    return row.type === 'checkbox';
  }

  /**
   * Verifica si una fila es de tipo button.
   * @param row La fila a verificar.
   * @returns `true` si la fila es de tipo button, de lo contrario, `false`.
   */
  isButtonRow(row: DynamicListRow | DynamicListRowButton): row is DynamicListRowButton {
    return row.type === 'button';
  }

  /**
   * Verifica si una fila es de tipo button.
   * @param row La fila a verificar.
   * @returns `true` si la fila es de tipo button, de lo contrario, `false`.
   */
  isLinkRow(row: DynamicListRow | DynamicListRowLink): row is DynamicListRowLink {
    return row.type === 'link';
  }

  isButtonGroupRow(row: DynamicListRow | DynamicListRowButtonGroup): row is DynamicListRowButtonGroup {
    return row.type === 'button_group';
  }
}
