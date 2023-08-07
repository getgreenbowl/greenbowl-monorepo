import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  template: ` <gb-grid-shell gridTitle="Customers" apiURL="/user/list">
    <!-- columns -->

    <gb-column field="id" alignment="left" title="ID" />
    <gb-column field="name" />
    <gb-column field="mobile" />
    <gb-column field="createdAt" title="Created at">
      <ng-template #cell let-item>
        {{ item?.createdAt | date : 'dd-MM-yyyy HH:mm:ss' }}
      </ng-template>
    </gb-column>
    <gb-column title="Status" field="active">
      <ng-template #cell let-item>
        <gb-badge
          [text]="item.active ? 'Active' : 'InActive'"
          [variant]="item.active ? 'secondary' : 'destructive'"
        />
      </ng-template>
    </gb-column>
    <!-- columns -->
  </gb-grid-shell>`,
})
export class AppUserListComponent {}
