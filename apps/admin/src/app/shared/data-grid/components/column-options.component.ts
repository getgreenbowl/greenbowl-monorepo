import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { DataGridService } from '../data-grid.service';
import { OPTION_TITLES } from '../data-grid.type';

@Component({
  selector: 'column-options',
  template: ` <div [class]="toggleClass">
    <div class="show_header_selection_box">
      <div
        class="filter-header-column d-flex justify-content-between align-items-center"
      >
        <div class="p-3">
          <div class="d-flex justify-content-between">
            <p class="m-0">{{ active }}</p>
          </div>
        </div>
        <button class="btn pe-3" (click)="close($event)">
          <i class="fa fa-times pointer"></i>
        </button>
      </div>

      <ng-container *ngIf="active === 'Select Columns' || active === 'Export'">
        <div
          class="custom-control custom-checkbox"
          *ngFor="let h of dgs.headers$ | async; let index = index"
        >
          <span>
            <input
              type="checkbox"
              class="custom-control-input"
              (change)="dgs.toggleVisibility(index)"
              [checked]="h.visible"
              [id]="h.title"
            />
            <label class="custom-control-label" [for]="h.title">{{
              h.title
            }}</label>
          </span>
        </div>
      </ng-container>

      <ng-container *ngIf="active === 'Actions'">
        <div class="actionContent my-3">
          <button
            class="btn btn-primary btn-block"
            *ngFor="let action of bulkActions"
            (click)="handleActionClick(action)"
          >
            {{ action }}
          </button>
        </div>
      </ng-container>
    </div>

    <div class="grid_options_strip">
      <div (click)="toggleSwitcher($event, titles.ACTIONS)">
        <span [ngClass]="{ active: active === titles.ACTIONS }"> Actions </span>
      </div>
      <div (click)="toggleSwitcher($event, titles.SELECT_COLUMNS)">
        <span [ngClass]="{ active: active === titles.SELECT_COLUMNS }">
          Columns
        </span>
      </div>
    </div>
  </div>`,
  styleUrls: ['../data-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnOptionsComponent {
  isForm = false;

  constructor(public dgs: DataGridService, private el: ElementRef) {}
  @Input() bulkActions: string[] = [];
  @Output() bulkActionClick = new EventEmitter();

  @HostListener('document:click', ['$event'])
  close(event: MouseEvent) {
    if(!this.el.nativeElement.contains(event.target)) {
      this.active = '';
      this.isOpenSwitcher = false;
      this.toggleClass = 'show_header_selection hidden';
      event.stopPropagation();
    }

  }

  isOpenSwitcher = false;
  toggleClass = 'show_header_selection';
  selectAll = true;
  readonly titles = OPTION_TITLES;
  active = '';


  handleActionClick(action: string) {
    this.bulkActionClick.emit({ action, ...this.dgs.getCurrentState() });
  }

  //column selector hide and show
  toggleSwitcher(event: MouseEvent, type = ''): void {
    if (this.active != type && this.isOpenSwitcher) {
      this.active = type;
      return;
    }
    this.active = type;

    this.isOpenSwitcher = !this.isOpenSwitcher;
    this.toggleClass = this.isOpenSwitcher
      ? 'show_header_selection shown'
      : 'show_header_selection hidden';
    event.stopPropagation();
  }
}
