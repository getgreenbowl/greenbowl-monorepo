import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEFAULT_ROWS } from '../../types';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'gb-grid-limit',
  template: `
    <sgb-btn-group-container>
      <sgb-btn-group
        [ngClass]="{
          active: (paginationService.selectedLimit$ | async) === limit
        }"
        *ngFor="let limit of limits"
        [text]="limit.toString()"
        (click)="paginationService.updateSelectedLimit(limit)"
      />
    </sgb-btn-group-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GbGridLimitComponent {
  constructor(public paginationService: PaginationService) {}
  limits = DEFAULT_ROWS;
}
