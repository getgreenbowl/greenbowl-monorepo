import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DataGridService } from './data-grid.service';
import {
  actionButtonType,
  filterEmitterType,
  headerObject
} from './data-grid.type';
import { map } from 'rxjs';
import { SubSink } from 'subsink';
import { Router } from '@angular/router';

@Component({
  selector: 'dash-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashDataGridComponent implements OnInit, OnChanges, OnDestroy {
  constructor(
    public _ds: DataGridService,
    private router: Router,
    private _cd: ChangeDetectorRef,
  ) { }

  @Input() data: Array<any> = []; // set database records
  @Input() headerInfo: Array<headerObject | any> = []; //th
  @Input() filterDropdownData: any = null;
  @Input() totalCount!: number;
  @Input() loading = false;
  @Input() actionButtons: actionButtonType[] = [];
  @Input() bulkActions: string[] = [];
  @Input() checkbox = true;
  @Input() headerTitle = '';
  @Input() handleExport: any;
  @Input() selected: number | string[] = [];
  @Input() extraExportKeys: { key: string; title: string }[] = [];
  @Input() showAdd = true;
  @Input() id = '';



  @Output() handleChange = new EventEmitter<filterEmitterType>();
  @Output() actionButtonClick = new EventEmitter<any>(undefined);
  @Output() bulkActionClick = new EventEmitter<any>(undefined);
  @Output() addClick = new EventEmitter<any>(undefined);

  private subs = new SubSink();
  itemsPerPage = this._ds.getFilter$.pipe(map((data) => data.limit));
  currentPage = this._ds.getFilter$.pipe(map((data) => data.page));
  timeout: null|number = null;
  actualLoader = false;

  ngOnInit(): void {
    this.subs.sink = this._ds.getFilter$.subscribe((data) => {
      this.handleChange.emit(data);
    });
    this._ds.updateHeaders(this.headerInfo);

  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['loading']?.currentValue) {
      this.timeout = window.setTimeout(() => {
        this.actualLoader = true;
        this._cd.detectChanges();
      }, 1500);
    }

    if (!changes['loading']?.currentValue && this.timeout) {
      clearTimeout(this.timeout);
      this.actualLoader = false;
      this._cd.detectChanges();
    }
    if (changes['data']?.currentValue) {
      this._ds.updateData(this.data);
    }

    if (changes['filterDropdownData']?.currentValue) {
      this._ds.updateFilterItems(changes['filterDropdownData'].currentValue);
    }

    if (changes['actionButtons']?.currentValue) {
      this._ds.updateActionButtons(changes['actionButtons']?.currentValue);
    }

    if (
      changes['selected']?.currentValue &&
      changes['selected']?.currentValue?.length
    ) {
      this._ds.initialSelected(changes['selected'].currentValue);
    }


    // Pratik ==> changes headers dynamically in conclave component
    if (changes['headerInfo']?.currentValue) {
      this._ds.updateHeaders(changes['headerInfo'].currentValue)
    }
  }

  ngOnDestroy(): void {
    this._ds.resetSelection();
    this.subs.unsubscribe();
  }

  changePage(page: number) {
    console.log('outside', page);

    this._ds.handlePageChange(page);
    // this.updateData.emit(page)
    window.scroll(0, 0);
  }


}
