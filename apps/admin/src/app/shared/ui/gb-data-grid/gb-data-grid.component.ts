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
import { combineLatest, map, pairwise } from 'rxjs';
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

  //   I arrived to the following solution, a bit similar to what Cartant proposed but using pairwise instead on scan, that seems more elegant. Pairwise operator keeps previously emitted value in buffer and supplies previous value together with newly emitted value to the next operator as an array, therefore you can easily check if the values have changed and pass the results further. In my example I simplified it to just 2 Observables for clarity.

  // combineLatest([obs1$, obs2$]).pipe(
  //     pairwise(),
  //     map(([oldValues, newValues]) => oldValues.map((value, i) => value !== newValues[i])),
  //     ).subscribe(([obs1$HasChanged, obs2$HasChanged]) => {
  // )

  ngOnInit(): void {
    this.subs.sink = combineLatest([
      this.paginationService.page$,
      this.paginationService.selectedLimit$,
      this.columnService.sort$,
      this.gridData.selectionInfo$,
    ])
      .pipe(
        pairwise(),
        map(([oldValues, newValues]) => {
          const labels = ['page', 'limit', 'sort', 'selectionInfo'];
          const [page, limit, sort, selectionInfo] = newValues;
          const [_page, _limit, _sort, _selectionInfo] = oldValues;
          const lastChangedIndex = newValues.findIndex(
            (value, i) => value !== oldValues[i]
          );

          return {
            currentValues: {
              page,
              limit,
              sort,
              selectionInfo,
            },
            previousValues: {
              _page,
              _limit,
              _sort,
              _selectionInfo,
            },
            lastChanged: labels[lastChangedIndex],
          };
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data, 'check me');

          this.emitEvents.emit(data);
        },
        error: (err) => {
          console.log(err, 'error');
        },
      });
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
