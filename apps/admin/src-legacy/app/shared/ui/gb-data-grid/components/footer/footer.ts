import { Component } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'table-footer',
  template: `<div class="rounded-0 py-3 flex justify-between">
    <ng-container *ngIf="paginationService.pagination$ | async as pagination">
      <div class="flex">
        <gb-grid-limit />
        <div class="flex items-center pl-4">
          Rows:
          <span class="font-bold pl-2">{{
            pagination.collectionSize | number
          }}</span>
        </div>
      </div>

      <gb-pagination
        [collectionSize]="pagination.collectionSize"
        [pageSize]="pagination.limit"
        [page]="pagination.page"
        [maxSize]="7"
        [boundaryLinks]="true"
        [rotate]="true"
        (pageChange)="paginationService.updatePage($event)"
        class="ml-auto flex"
      />
    </ng-container>
  </div> `,
})
export class GbTableFooterComponent {
  constructor(public paginationService: PaginationService) {}
}
