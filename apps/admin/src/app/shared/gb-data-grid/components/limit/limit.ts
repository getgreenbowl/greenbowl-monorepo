import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEFAULT_ROWS } from '../../types';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'gb-grid-limit',
  template: `
<div
    class="btn-toolbar  mb-2 justify-content-between"
    role="toolbar"
    aria-label="Toolbar with button groups"
  >
    <div class="btn-group" role="group">
    <button
      class="btn border"
      [ngClass]="{ active: (paginationService.selectedLimit$ | async) === limit }"
      *ngFor="let limit of limits"
      (click)="paginationService.updateSelectedLimit(limit)"
    >
      {{ limit }}
    </button>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GbGridLimitComponent {
  constructor(public paginationService: PaginationService) {}
  limits = DEFAULT_ROWS;
}
