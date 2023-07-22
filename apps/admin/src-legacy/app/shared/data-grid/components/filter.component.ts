import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DataGridService } from '../data-grid.service';
import { filterConfig } from '../data-grid.type';

@Component({
  selector: '[grid-filter]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <input
      *ngIf="renderInput"
      [type]="config.type"
      class="form-control form-control-sm"
      [placeholder]="placeholder"
      [(ngModel)]="filterValue"
      (keyup)="handleFilterChange()"
    />
    <input
      *ngIf="renderDate"
      type="date"
      class="form-control form-control-sm"
      [placeholder]="placeholder"
      [(ngModel)]="filterValue"
      (change)="handleFilterChange()"
    />
  `,
})
export class GridFilterComponent implements OnInit, OnDestroy {
  constructor(private _ds: DataGridService, private _cdr: ChangeDetectorRef) {}

  @Input() config!: filterConfig;
  @Input() headerKey = '';
  get placeholder() {
    return this.config.placeholder || '';
  }
  get renderInput() {
    const { type } = this.config;
    return type == 'text' || type == 'number';
  }
  get renderSelect() {
    return this.config.type == 'select';
  }
  get renderDate() {
    return this.config.type == 'date';
  }
  get renderDateRange() {
    return this.config.type == 'dateRange';
  }

  filterValue: any = null;
  filterSubscription!: Subscription;
  ngOnInit(): void {
    this.filterSubscription = this._ds.getFilter$.subscribe((res) => {
      this.filterValue = null;
      this._cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.filterSubscription.unsubscribe();
  }

  handleDateFilter(event: any) {
    const key = this.config.field || this.headerKey;

    if (event) {
      this.filterValue = event;
      this._ds.handleFilterChange({
        [key]: {
          type: 'dateRange',
          value: this.filterValue,
        },
      });
    } else {
      this.filterValue = null;
      this._ds.handleFilterChange({ [key]: this.filterValue });
    }
  }

  handleFilterChange() {
    const key = this.config.field || this.headerKey;
    this._ds.handleFilterChange({ [key]: this.filterValue });
  }
}
