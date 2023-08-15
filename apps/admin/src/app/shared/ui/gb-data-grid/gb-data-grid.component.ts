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
import { EmitterService } from './services/internal/event-emitter.service';

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
  private emitterService = inject(EmitterService);

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
    this.subs.sink = this.emitterService.registeredEmitters$.subscribe(
      (emitters) => {
        for (const key in emitters) {
          const emitter = emitters[key];
          this.subs.sink = emitter.subscribe({
            next: (val) => this.emitEvents.emit({ value: val, key }),
          });
        }
      }
    );
    // this.emitEvents.emit({ limit: 10, page: 1, sort: '' });
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
