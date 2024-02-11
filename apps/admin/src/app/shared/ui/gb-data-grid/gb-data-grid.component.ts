import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  inject,
} from '@angular/core';
import { GridDataService } from './services/data.service';
import { GridColumnService } from './services/columns.service';
import { GbGridColumnsComponent } from './components/base-table/columns';
import {
  HideFeatures,
  STATIC_ACTION_HEADER,
  STATIC_SELECTABLE_HEADER,
} from './types';
import { ActionService } from './services/actions.service';
import { LoadingService } from './services/loading.service';
import { ToolbarService } from './services/toolbar.service';
import { PaginationService } from './services/pagination.service';
import { MetaDataService } from './services/meta-data.service';
import { GbActionComponent } from './components/base-table/action';
import { GbGridToolbarComponent } from './components/toolbar/gb-toolbar';
import { SubSink } from 'subsink';

@Component({
  selector: 'gb-data-grid',
  templateUrl: './gb-data-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GbDataGridComponent
  implements OnChanges, AfterContentInit, OnInit, OnDestroy
{
  private gridData = inject(GridDataService);
  private columnService = inject(GridColumnService);
  private actionService = inject(ActionService);
  private loader = inject(LoadingService);
  private toolbarService = inject(ToolbarService);
  private paginationService = inject(PaginationService);
  private metaService = inject(MetaDataService);

  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() collectionSize = 0;
  @Input() gridTitle = '';
  @Input() hideFeatures: HideFeatures = [];
  @Input() selectable = true;

  @Output() emitEvents = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter();
  @Output() selectionChange = new EventEmitter();
  @Output() pageChange = new EventEmitter();
  @Output() limitChange = new EventEmitter();

  private subs = new SubSink();

  @ContentChildren(GbGridColumnsComponent)
  columns!: QueryList<GbGridColumnsComponent>;

  @ContentChildren(GbActionComponent) actions?: QueryList<GbActionComponent>;

  @ContentChildren(GbGridToolbarComponent)
  toolbar?: QueryList<GbGridToolbarComponent>;

  ngAfterContentInit(): void {
    this.updateColumns(this.columns);
    if (this.actions) {
      this.actionService.updateActions(this.actions);
    }
    if (this.toolbar) {
      this.toolbarService.updateToolbar(this.toolbar);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.gridData.updateData(changes['data'].currentValue);
    }

    if (
      changes['loading']?.currentValue ||
      changes['loading']?.currentValue === false
    ) {
      this.loader.updateLoader(changes['loading'].currentValue);
    }

    if (changes['collectionSize']?.currentValue) {
      this.paginationService.updateCollectionSize(
        changes['collectionSize']?.currentValue
      );
    }

    if (changes['gridTitle']?.currentValue) {
      this.metaService.updateGridTitle(changes['gridTitle'].currentValue);
    }
  }

  ngOnInit(): void {
    this.subs.sink = this.paginationService.page$.subscribe((page) =>
      this.pageChange.emit(page)
    );
    this.subs.sink = this.paginationService.selectedLimit$.subscribe((limit) =>
      this.limitChange.emit(limit)
    );
    this.subs.sink = this.columnService.sort$.subscribe((sort) =>
      this.sortChange.emit(sort)
    );
    this.subs.sink = this.gridData.selectionInfo$.subscribe((selection) =>
      this.selectionChange.emit(selection)
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private updateColumns(col: QueryList<GbGridColumnsComponent>) {
    const _columns = col.toArray();

    if (this.actions?.length) {
      _columns.push(STATIC_ACTION_HEADER);
    }

    if (this.selectable) {
      _columns.unshift(STATIC_SELECTABLE_HEADER);
    }

    col.reset(_columns);
    this.columnService.updateColumns(col);
  }
}
