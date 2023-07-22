import { Overlay } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  inject,
} from '@angular/core';
import { ApiService } from '../services/api.service';
import { GbActionComponent } from '../ui/gb-data-grid/components/base-table/action';
import { GbGridColumnsComponent } from '../ui/gb-data-grid/components/base-table/columns';
import { GbGridToolbarComponent } from '../ui/gb-data-grid/components/toolbar/gb-toolbar';
import { GbDataGridModule } from '../ui/gb-data-grid/gb-data-grid.module';
import { GbNotification } from '../ui/notification/notification.service';
import { FilterService } from './filters/filter.service';
import { SubSink } from 'subsink';
import { take } from 'rxjs';
import { GbGridFilterComponent } from './filters/components/grid-filter';

@Component({
  selector: 'gb-grid-shell',
  standalone: true,
  imports: [
    GbDataGridModule,
    CommonModule,
    GbGridColumnsComponent,
    GbActionComponent,
    GbGridToolbarComponent,
  ],
  template: ` <gb-data-grid
    [data]="data"
    [loading]="loading"
    [collectionSize]="collectionSize"
    [gridTitle]="gridTitle"
    (emitEvents)="captureGridEvents($event)"
  >
    <!-- Toolbar -->
    <gb-toolbar
      *ngFor="let tool of toolbar"
      [icon]="tool.icon"
      [name]="tool.name"
      (handleClick)="tool.handleClick.emit($event)"
    />
    <ng-container *ngIf="filters?.length">
      <gb-toolbar
        icon="filter_alt"
        name="Filter"
        (handleClick)="openFilters()"
      />
      <gb-toolbar icon="filter_alt_off" name="Clear Filter" />
    </ng-container>
    <!-- Toolbar -->

    <!-- Action -->
    <ng-container *ngIf="actions">
      <gb-action
        *ngFor="let action of actions"
        [icon]="action.icon"
        [tooltip]="action.tooltip"
        (handleClick)="action.handleClick && action.handleClick.emit($event)"
        [action]="action._action"
      />
    </ng-container>
    <!-- Action -->

    <!-- Columns -->
    <gb-column
      *ngFor="let column of columns"
      [title]="column.title"
      [field]="column.field"
      [sortable]="column.sortable"
      [visible]="column.visible"
      [alignment]="column.alignment"
    >
      <ng-container *ngIf="column.head">
        <ng-template #head let-item>
          <ng-container
            *ngTemplateOutlet="column.head; context: { $implicit: item }"
          ></ng-container>
        </ng-template>
      </ng-container>
      <ng-container *ngIf="column.cell">
        <ng-template #cell let-item>
          <ng-container
            *ngTemplateOutlet="
              column.cell;
              context: { $implicit: item, column }
            "
          ></ng-container>
        </ng-template>
      </ng-container>
    </gb-column>
    <!-- Columns -->
  </gb-data-grid>`,
})
export class GbGridShellComponent implements OnDestroy {
  constructor(private api: ApiService, private notif: GbNotification) {}

  overlay = inject(Overlay);
  filterService = inject(FilterService);

  @Input() apiURL = '';
  @Input() gridTitle = '';
  @Input() loadOnMount = true;

  @Output() protected actionEvents = new EventEmitter<any>();

  @ContentChildren(GbGridColumnsComponent)
  protected columns!: QueryList<GbGridColumnsComponent>;

  @ContentChildren(GbActionComponent) actions?: QueryList<GbActionComponent>;

  @ContentChildren(GbGridToolbarComponent)
  toolbar?: QueryList<GbGridToolbarComponent>;

  @ContentChildren(GbGridFilterComponent)
  filters?: QueryList<GbGridFilterComponent>;

  protected loading = false;
  protected collectionSize!: number;
  protected data: any[] = [];
  private subs = new SubSink();
  private gridEvents: any = null;
  private filterValues: any = null;

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  captureGridEvents(events: any) {
    this.gridEvents = events;
    this._getData();
  }

  openFilters() {
    if (!this.filters) {
      return;
    }
    this.filterService.updateFilters(this.filters);

    const filterPanel = this.filterService.openFilterPanel();
    filterPanel.instance.search.pipe(take(1)).subscribe((filters) => {
      this.filterValues = filters;
      this._getData();
    });
  }

  private _getData() {
    if (!this.apiURL) {
      return console.error('Please provide a api url');
    }
    this.loading = true;
    this.subs.sink = this.api
      .getList<any>(this.apiURL, this.buildFilters())
      .subscribe({
        next: ({ data }) => {
          this.loading = false;
          this.collectionSize = data['count'];
          this.data = data.rows;
        },
        error: () => {
          this.loading = false;
          this.notif.show({
            text: 'Failed to load list',
            title: 'Error',
            id: 'fetch-list',
            type: 'error',
          });
        },
      });
  }

  private buildFilters() {
    return { ...this.gridEvents, filters: JSON.stringify(this.filterValues) };
  }
}
