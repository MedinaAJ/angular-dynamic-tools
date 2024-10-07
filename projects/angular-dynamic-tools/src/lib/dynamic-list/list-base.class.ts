import { ChangeDetectorRef, Directive, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { DynamicListConfig, DynamicListEvent } from './dynamic-list.types';
import { List } from './list';

@Directive()
export abstract class ListBaseComponent implements List, OnInit, OnDestroy {

  // Public properties
  listConfig!: DynamicListConfig;
  
  protected _unsubscribeAll: Subject<any> = new Subject<any>();

  /**
   * Constructor
   */
  constructor(
    protected router: Router,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.loadData();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Find entity by id
   * @param id
   */ 
  findEntityById(id: string): any | undefined {
    return this.listConfig.data.find((data: any) => data.id === id);
  }

  /**
   * List event handler
   * @param event
   */ 
  listEvent(event: DynamicListEvent): void {
    if (event.action == 'upsert')  {
      if(event.value?._id) {
        event.value.id = event.value._id;
      }
      this.upsert(event.value);

    } else if (event.action == 'pagination') {
      this.listConfig.pagination = event.value;
      this.loadData();
      
    } else if (event.action == 'sort') {
      this.listConfig.sort.currentSort = event.value;
      if(this.listConfig.sort.currentSort.direction == '') {
        this.listConfig.sort.currentSort = this.listConfig.sort.defaultSort;
      }
      this.loadData();
      
    } else if (event.action == 'back') {
      window.history.back();
    }
  }

  /**
   * Upsert event handler
   * @param input
   * @returns
   */ 
  upsert(input: any) {
    const currentRoute = this.router.url;

    if (input && input.id) {
      this.router.navigate([`${currentRoute}/${input.id}`]); // Redireccionará a ':currentRoute/:id' para editar
    } else {
      this.router.navigate([`${currentRoute}/create`]); // Redireccionará a ':currentRoute/create' para crear
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Abstract methods
  // -----------------------------------------------------------------------------------------------------
  
  /**
   * Load data
   */
  abstract loadData(): void;
}

export function cloneConfig(config: DynamicListConfig) {
  const newConfig = {...config, rows: config.rows.map(row => ({...row}))};
  return newConfig;
}