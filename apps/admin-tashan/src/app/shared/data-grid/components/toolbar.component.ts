import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DataGridService } from '../data-grid.service';

@Component({
  selector: 'grid-toolbar',
  styleUrls: ['../data-grid.component.scss'],
  template: `<div class="card mb-2">
    <div
      class="d-flex gap-2 p-1 justify-content-between align-items-center bg-light"
    >
      <h5 class="m-0">{{ headerTitle }}</h5>
      <div class="gap-2 d-flex">
        <if-data>
          <btn-icon icon="filter" title="filter" (onClick)="ds.toggleFilterVisibility()"  />
        </if-data>
        <if-data>
        <btn-icon icon="x-square" title="clear selection" (onClick)="ds.resetSelection()"  />
        </if-data>
        <btn-icon icon="filter-x" title="clear filter" (onClick)="ds.clearFilter()"  />
        <btn-icon
         icon="plus"
         title="Add"
         (onClick)="addClick.emit($event)"
         *ngIf="showAdd"
         />
      </div>
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridToolbarComponent {
  constructor(public ds: DataGridService) {}
  @Input() headerTitle: string = '';
  @Input() showExport: boolean = false;
  @Input() showAdd: boolean = true;

  @Output() addClick = new EventEmitter();

  @Output() excelClick = new EventEmitter();
}
