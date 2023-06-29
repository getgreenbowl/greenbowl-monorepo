import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { GridDataService } from './services/data.service';
import { GridColumnService } from './services/columns.service';
import { GbGridColumnsComponent } from './components/base-table/columns';
import {
  STATIC_ACTION_HEADER
} from './types';
import { ActionService } from './services/actions.service';
import { LoadingService } from './services/loading.service';
import { ToolbarService } from './services/toolbar.service';
import { PaginationService } from './services/pagination.service';
import { MetaDataService } from './services/meta-data.service';
import { GbActionComponent } from './components/base-table/action';
import { GbGridToolbarComponent } from './components/toolbar/gb-toolbar';

@Component({
  selector: 'gb-data-grid',
  templateUrl: './gb-data-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GbDataGridComponent
  implements OnChanges, AfterContentInit, OnInit
{
  constructor(
    private gridData: GridDataService,
    private columnService: GridColumnService,
    private actionService: ActionService,
    private loader: LoadingService,
    private toolbarService: ToolbarService,
    private paginationService: PaginationService,
    private metaService: MetaDataService
  ) {}

  /**
   * data to display
   */
  @Input() data: any[] = [];
  @Input() loading = false;
  @Input() collectionSize = 0;
  @Input() gridTitle = '';

  @Output() toolbarEvents = new EventEmitter();

  @ContentChildren(GbGridColumnsComponent)
  columns!: QueryList<GbGridColumnsComponent>;

  @ContentChildren(GbActionComponent) actions?: QueryList<GbActionComponent>

  @ContentChildren(GbGridToolbarComponent) toolbar?: QueryList<GbGridToolbarComponent>;

  ngAfterContentInit(): void {
      this.updateColumns(this.columns);
      if(this.actions) {
        this.actionService.updateActions(this.actions)
      }

      if(this.toolbar) {
        this.toolbarService.updateToolbar(this.toolbar)
      }

  }

  ngOnInit(): void {
    this._updateEmitters();
  }

  private _updateEmitters() {
    this.toolbarService.updateEmitter(this.toolbarEvents);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue) {
      this.gridData.updateData(changes['data'].currentValue);
    }

    if (changes['loading']?.currentValue) {
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

  private updateColumns(col: QueryList<GbGridColumnsComponent>) {
    const _columns = col.toArray();

    if (this.actions?.length) {
      _columns.push(STATIC_ACTION_HEADER);
    }
    col.reset(_columns)
    this.columnService.updateColumns(col);
  }
}
