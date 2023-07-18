import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { GbActionComponent } from '../gb-data-grid/components/base-table/action';
import { GbGridColumnsComponent } from '../gb-data-grid/components/base-table/columns';
import { GbGridToolbarComponent } from '../gb-data-grid/components/toolbar/gb-toolbar';
import { GbDataGridModule } from '../gb-data-grid/gb-data-grid.module';
import { ApiService } from '../services/api.service';
import { GbNotification } from '../ui/notification/notification.service';

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
    (emitEvents)="gridEvents($event)"
  >
    <!-- Toolbar -->
    <gb-toolbar
      *ngFor="let tool of toolbar"
      [icon]="tool.icon"
      [name]="tool.name"
      (handleClick)="tool.handleClick.emit($event)"
    />
    <gb-toolbar icon="filter_alt" name="Filter" />
    <gb-toolbar icon="filter_alt_off" name="Clear Filter" />
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
export class GbGridShellComponent {
  constructor(private api: ApiService, private notif: GbNotification) {}

  @Input() apiURL = '';
  @Input() gridTitle = '';
  @Input() loadOnMount = true;

  @Output() protected actionEvents = new EventEmitter<any>();

  @ContentChildren(GbGridColumnsComponent)
  protected columns!: QueryList<GbGridColumnsComponent>;

  @ContentChildren(GbActionComponent) actions?: QueryList<GbActionComponent>;

  @ContentChildren(GbGridToolbarComponent)
  toolbar?: QueryList<GbGridToolbarComponent>;

  protected loading = false;
  protected collectionSize!: number;
  protected data: any[] = [];

  gridEvents(events: any) {
    this._getData(events);
  }

  private _getData(options: any) {
    if (!this.apiURL) {
      return console.error('Please provide a api url');
    }
    this.loading = true;
    this.api.getList<any>(this.apiURL, options).subscribe({
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
}
