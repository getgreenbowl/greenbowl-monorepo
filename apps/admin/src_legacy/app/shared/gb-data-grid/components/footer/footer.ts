import { Component } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';

@Component({
  selector: 'table-footer',
  template: `<div class="rounded-0 p-2 d-flex justify-content-between border">
    <ng-container *ngIf="paginationService.pagination$ | async as pagination">
      <div class="d-flex">
        <gb-grid-limit />
        <div>
          |&nbsp;&nbsp;Rows:&nbsp;<b>{{
            pagination.collectionSize | number
          }}</b>
        </div>
      </div>

      <gb-pagination
        class="f-right align-self-end"
        [collectionSize]="pagination.collectionSize"
        [pageSize]="pagination.limit"
        [page]="pagination.page"
        [maxSize]="7"
        [boundaryLinks]="true"
        [rotate]="true"
        (pageChange)="paginationService.updatePage($event)"
        class="ml-auto"
      />
    </ng-container>
  </div> `,
})
export class GbTableFooterComponent {
  constructor(public paginationService: PaginationService) {}
}
