
export interface DynamicListRow {
    property?: string;
    renderValue?: (row: any) => string | null;
    label: string;
    pipe?: string;
    bolder?: boolean;
    width?: string;
    class?: string;
    notSort?: boolean;
    notFilter?: boolean;
    tooltipLabel?: (row: any) => string | null;

    type?: 'text' | 'checkbox' | 'button' | 'icon' | 'link' | 'button_group';
    show_condicional?: (row: any) => boolean;
}

export interface DynamicListRowCheckbox extends DynamicListRow {
    type: 'checkbox';
    tooltip?: string;
    override_icon_check?: string;
    override_icon_uncheck?: string;
    override_color_action?: string;
    value?: (row: any) => any;
    action?: string;
    notFilter: true;
}

export interface DynamicListRowIcon extends DynamicListRow {
    type: 'icon';
    renderValue: (row: any) => string | null;
    notFilter: true;
}

export interface DynamicListRowButton extends DynamicListRow {
    type: 'button';
    action: string;
    icon: string;

    badge?: (row: any) => number;
    notFilter: true;
}

export interface DynamicListRowLink extends DynamicListRow {
    type: 'link';
    action: string;

    badge?: (row: any) => number;
}

export interface DynamicListRowButtonGroup extends DynamicListRow {
    type: 'button_group';
    icon?: string;
    buttons: Array<{
        type: 'button';
        action: string;
        label: string;
        icon?: string;
        badge?: (row: any) => number;
    }>;
}

export interface DynamicListAction {
    label: string;
    icon?: string;
    action: string; 
}

export interface DynamicListConfig {
    header?: {
        title?: string;
        description?: string;
        filter?: boolean;
        actions: DynamicListAction[];
    },
    bulkActions?: DynamicListAction[];
    not_edit?: boolean;
    rows: (DynamicListRow | DynamicListRowCheckbox | DynamicListRowButton | DynamicListRowIcon | DynamicListRowLink)[];
    data: any[];
    pagination?: {
        itemsPerPage: number,
        currentPage: number,
        totalItems: number,
        pageSizeOptions: number[]
    };
    sort?: {
        currentSort: {
            active: string,
            direction: string,
        },
        defaultSort: {
            active: string,
            direction: string
        }
    };
    customTable?: boolean;
    filters?: FilterConfig[];
    buttonFilters?: ButtonFilter[];
    enableFilters?: boolean;
    dynamicQuery?: boolean;
}

export interface DynamicListEvent {
    action: string;
    value: any;
}

export enum ValueType {
    Boolean = 'Boolean',
    Texto = 'Texto',
    Fecha = 'Fecha',
    FechaHora = 'FechaHora',
    NumeroEntero = 'NumeroEntero',
    NumeroDecimal = 'NumeroDecimal',
    Objeto = 'Objeto'
  }
  
  export enum MongoOperator {
    Eq = '$eq',
    Gt = '$gt',
    Gte = '$gte',
    Lt = '$lt',
    Lte = '$lte',
    Ne = '$ne',
    Regex = '$regex',
    Exists = '$exists',
    In = '$in',
    Nin = '$nin',
    All = '$all'
  }

  export interface ButtonFilter {
    id?: string;
    label: string;
    identitySection?: string;
    tenantId?: string;
    filters: FilterConfig[];
  }
  
  export interface FilterConfig {
    field: string;
    operator: MongoOperator;
    value: any;
    valueType: ValueType;
  }
  
  
