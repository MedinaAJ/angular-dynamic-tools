import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonFilter, DynamicListRow, DynamicListRowButton, DynamicListRowCheckbox, DynamicListRowIcon, DynamicListRowLink, FilterConfig, MongoOperator, ValueType } from '../dynamic-list.types';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() rows!: (DynamicListRow | DynamicListRowCheckbox | DynamicListRowButton | DynamicListRowIcon | DynamicListRowLink)[];
  @Input() filters: FilterConfig[] = [];
  @Input() buttonFilters?: ButtonFilter[] = [];
  @Output() filtersChange = new EventEmitter<FilterConfig[]>();
  @Output() filtersBtnRemoveEvent = new EventEmitter<ButtonFilter>();
  @Output() saveCurrentFiltersEvent = new EventEmitter<ButtonFilter>();

  editBtnFilter: boolean = false;
  
  filterForm: FormGroup;
  showFilterForm: boolean = false;

  MongoOperator = MongoOperator;

  operators = [
    { label: '=', value: MongoOperator.Eq },
    { label: '!=', value: MongoOperator.Ne },
    { label: '<', value: MongoOperator.Lt },
    { label: '>', value: MongoOperator.Gt },
    { label: '>=', value: MongoOperator.Gte },
    { label: '<=', value: MongoOperator.Lte },
    { label: 'Regex', value: MongoOperator.Regex },
    { label: 'Contiene', value: 'contains' },
    { label: 'Empieza por', value: 'startsWith' },
    { label: 'Acaba por', value: 'endsWith' },
    { label: 'Exists', value: MongoOperator.Exists },
    { label: 'In', value: MongoOperator.In },
    { label: 'Not In', value: MongoOperator.Nin },
    { label: 'All', value: MongoOperator.All }
  ];

  valueTypes = [
    { label: 'Boolean', value: ValueType.Boolean },
    { label: 'Texto', value: ValueType.Texto },
    { label: 'Fecha', value: ValueType.Fecha },
    { label: 'Fecha Hora', value: ValueType.FechaHora },
    { label: 'Nº Entero', value: ValueType.NumeroEntero },
    { label: 'Nº Decimal', value: ValueType.NumeroDecimal },
    { label: 'Lista', value: ValueType.Lista }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      field: [''],
      operator: [MongoOperator.Eq],
      value: [''],
      valueType: [ValueType.Texto]
    });
  }

  ngOnInit() {
    this.filterForm.get('field').valueChanges.subscribe((field) => {
      const filterOptions = this.getFilterOptions(field);
  
      // Si hay opciones de filtro, forzamos el ValueType a 'Lista'
      if (filterOptions && filterOptions.length > 0) {
        this.filterForm.get('valueType').setValue(ValueType.Lista);
        this.filterForm.get('valueType').disable(); // Deshabilitamos el selector de tipo
      } else {
        this.filterForm.get('valueType').enable(); // Permitimos seleccionar otros tipos
        this.filterForm.get('valueType').setValue(ValueType.Texto); // Valor por defecto
      }
  
      // Limpiar el valor actual si el campo cambia
      this.filterForm.get('value').reset();
    });
  
    this.filterForm.get('operator').valueChanges.subscribe((value) => {
      if (value === MongoOperator.Regex || value === 'contains' || value === 'startsWith' || value === 'endsWith') {
        this.filterForm.get('valueType').setValue(ValueType.Texto);
        this.filterForm.get('valueType').disable();
      } else if (!this.getFilterOptions(this.filterForm.get('field').value)) {
        this.filterForm.get('valueType').enable();
      }
    });
  }
  
  saveCurrentFilters() {
    let label = prompt('Introduce un nombre para el filtro');
    if(label) {
      this.saveCurrentFiltersEvent.emit({label, filters: this.filters});
    }
  }

  toggleFilterForm() {
    this.showFilterForm = !this.showFilterForm;
  }

  selectStoredFilter(filters: FilterConfig[]) {
    this.filters = structuredClone(filters);
    this.filtersChange.emit(this.filters);
    this.showFilterForm = false;
  }

  removeStoredFilter(btn: ButtonFilter) {
    this.filtersBtnRemoveEvent.emit(btn);
  }

  addFilter() {
    if (!this.filters) this.filters = [];
    const form = this.filterForm.getRawValue(); // Obtener todos los valores, incluidos los deshabilitados
    const filter: FilterConfig = { ...form }; // Clonar los valores para el nuevo filtro
  
    // Postprocesado del valor según el operador seleccionado
    if (form.operator === 'contains') {
      filter.value = `.*${filter.value}.*`;
    } else if (form.operator === 'startsWith') {
      filter.value = `^${filter.value}`;
    } else if (form.operator === 'endsWith') {
      filter.value = `${filter.value}$`;
    }
  
    if (form.operator === 'contains' || form.operator === 'startsWith' || form.operator === 'endsWith') {
      filter.valueType = ValueType.Texto;
      filter.operator = MongoOperator.Regex;
    }
  
    const validValue = this.validateValue(filter.value, filter.valueType);
    if (validValue !== null) {
      filter.value = validValue;
      this.filters.push(filter);
      this.filtersChange.emit(this.filters);
      this.filterForm.reset();
      this.showFilterForm = false;
    } else {
      alert('Invalid value for the selected value type.');
    }
  }

  removeAllFilters() {
    this.filters = [];
    this.filtersChange.emit(this.filters);
  }

  removeFilter(index: number) {
    this.filters.splice(index, 1);
    this.filtersChange.emit(this.filters);
  }

  getLabelForField(field: string): string {
    const row = this.rows.find(r => r.property === field);
    return row ? row.label : field;
  }

  getLabelForOperator(operator: MongoOperator | string, value: string): string {
    if (operator === MongoOperator.Regex) {
      if (/^\.\*.*\.\*$/.test(value)) {
        return 'Contiene';
      } else if (/^\^/.test(value)) {
        return 'Empieza por';
      } else if (/\$$/.test(value)) {
        return 'Acaba por';
      }
    }
    const op = this.operators.find(o => o.value === operator);
    return op ? op.label : operator;
  }

  cleanFilterValue(operator: MongoOperator | string, value: string): string {
    if (operator === MongoOperator.Regex) {
      return value.replace(/^\.\*/, '').replace(/\.\*$/, '').replace(/^\^/, '').replace(/\$$/, '');
    }
    return value;
  }

  validateValue(value: any, valueType: ValueType): any {
    switch (valueType) {
      case ValueType.NumeroEntero:
        return Number.isInteger(Number(value)) ? Number(value) : null;
      case ValueType.NumeroDecimal:
        return !isNaN(value) ? parseFloat(value) : null;
      case ValueType.Boolean:
        return value === 'true' ? true : value === 'false' ? false : null;
      case ValueType.Lista:
      case ValueType.Texto:
        return value;
      case ValueType.Fecha:
      case ValueType.FechaHora:
        return this.isValidDate(value) ? new Date(value).toISOString() : null;
      default:
        return null;
    }
  }

  isValidDate(value: string): boolean {
    return !isNaN(Date.parse(value));
  }

  getFilterOptions(field: string): Array<{ label: string; value: any }> | undefined {
    const row = this.rows.find((r) => r.property === field);
    return row?.filterOptions;
  }
}
