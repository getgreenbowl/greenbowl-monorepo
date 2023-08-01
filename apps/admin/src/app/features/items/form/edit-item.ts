import { Component, ViewChild, inject } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { GbNotification } from 'src/app/shared/ui/notification/notification.service';
import { ItemsFormComponent } from './form/form.component';

@Component({
  selector: 'edit-items',
  template: ` <page-header
      header="Edit item"
      (save)="handleSubmit()"
      [loading]="false"
    />
    <items-form />`,
})
export class EditItemsComponent {
  @ViewChild(ItemsFormComponent) itemsComponent!: ItemsFormComponent;

  api = inject(ApiService);
  notif = inject(GbNotification);

  handleSubmit() {
    //
  }
}
