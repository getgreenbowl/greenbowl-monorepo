import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DEFAULT_ROWS } from '../../types';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'gb-grid-limit',
  template: `
    <sgb-btn-group-container>
      <sgb-btn-group
        *ngFor="let limit of limits"
        [active]="(paginationService.selectedLimit$ | async) === limit"
        [text]="limit.toString()"
        (handleClick)="paginationService.updateSelectedLimit(limit)"
      />
    </sgb-btn-group-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GbGridLimitComponent {
  constructor(public paginationService: PaginationService) {}
  limits = DEFAULT_ROWS;
}
