import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { ShellConfig } from './grid-shell.types';
import { ApiService } from '../services/api.service';
import { DataGridService } from '../data-grid/data-grid.service';
import { actionButtonType, filterEmitterType } from '../data-grid/data-grid.type';

@Component({
  selector: 'dash-grid-shell',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<dash-data-grid
    [headerInfo]="headers"
    [data]="source"
    [filterDropdownData]="filterDropdownData"
    (handleChange)="handleChange($event)"
    [totalCount]="totalCount"
    [loading]="loading"
    [actionButtons]="actionButtons"
    (actionButtonClick)="actionButtonClick.emit($event)"
    (onAddClick)="handleAddClick.emit($event)"
    [checkbox]="checkbox"
    [handleExport]="handleExport"
    [headerTitle]="headerTitle"
  ></dash-data-grid>`,
})
export class GridShellComponent implements OnInit {
  constructor(
    private _api: ApiService,
    // private _sanitizer: SanitizationService,
    private _cdr: ChangeDetectorRef,
    private _ds: DataGridService
  ) {}
  @Input() config!: ShellConfig;
  @Input() filterDropdownData: any;
  @Input() actionButtons: actionButtonType[] = [];
  @Input() checkbox = true;
  @Input() handleExport: any;
  @Input() headerTitle = '';

  @Output() actionButtonClick = new EventEmitter<any>();
  @Output() bulkActionClick = new EventEmitter();
  @Output() handleAddClick = new EventEmitter<any>();

  get headers() {
    return this.config.headers;
  }

  source: any[] = [];
  filterSubject = new BehaviorSubject<filterEmitterType>({
    limit: 10,
    page:1,
    firstChange: false
  });
  filterChange$ = this.filterSubject.asObservable();
  loading = false;
  totalCount!: number;

  private debounce:any

  ngOnInit(): void {

    this.filterChange$.subscribe((data) => {
      this._getData(data);
    });
  }

  private _getData(qp: filterEmitterType) {
    if(!qp) return;

    if(!this.config.endpoint) return

    this.loading = true;
    this._cdr.detectChanges();
    const q = {
      filters:qp.filters,
      limit: qp.limit,
      sort:JSON.stringify(qp.sort),
      page: qp.page,
    };

    this._api
      .get(this.config.endpoint, q)
      .pipe(
        tap(() => {
          this.loading = false;
        }),
        catchError((err) => {
          this.loading = false;
          return err;
        })
      )
      .subscribe((data:any) => {
        this.totalCount = data.data.count;
        this.source = data.data.rows;
        this._cdr.detectChanges();
      });
  }

  handleChange(e:any) {
    if (!e) return;
    if (this.debounce) {
      clearTimeout(this.debounce);
    }

    let delay = 0;
    if (e.latestChange == 'filters') {
      delay = 500;
    }

  this.debounce =  setTimeout(() => {

      this.filterSubject.next(e);
    }, delay);


  }

  refresh() {
    const filters = this.filterSubject.getValue();
    if (filters) {
      this._getData(filters);
    }
    this._ds.resetSelection();
  }
}
