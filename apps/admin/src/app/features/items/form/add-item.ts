import {
  AfterViewInit,
  Component,
  OnDestroy,
  ViewChild,
  inject,
} from '@angular/core';
import { ItemsFormComponent } from './form/form.component';
import { ApiService } from 'src/app/shared/services/api.service';
import { GbNotification } from 'src/app/shared/ui/notification/notification.service';
import { FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { GbNotificationRef } from 'src/app/shared/ui/notification/notification-ref';

@Component({
  selector: 'add-items',
  template: `<page-header
      header="Add item"
      (save)="handleSubmit()"
      [loading]="false"
    />
    <items-form />`,
})
export class AddItemsComponent implements AfterViewInit, OnDestroy {
  @ViewChild(ItemsFormComponent) itemsFormComponent!: ItemsFormComponent;

  api = inject(ApiService);
  notif = inject(GbNotification);

  itemsForm!: FormGroup;
  private addRequests = new SubSink();

  ngOnDestroy(): void {
    this.addRequests.unsubscribe();
    this.notif.closeAll();
  }

  ngAfterViewInit(): void {
    this.itemsForm = this.itemsFormComponent.itemsForm;
  }

  handleSubmit() {
    if (this.itemsForm.invalid) {
      return;
    }
    this.addRequests.unsubscribe();
    this.notif.show({
      text: 'Adding item',
      id: 'add-item',
      type: 'loading',
    });

    this.addRequests.sink = this.api
      .post<any[]>('/items', this.itemsForm.value)
      .subscribe({
        next: () => {
          this.itemsForm.reset();
          this.notif.updateToast({
            text: 'Item added',
            id: 'add-item',
            type: 'success',
          });
        },
        error: () => {
          this.notif.updateToast({
            text: 'Something went wrong !',
            type: 'error',
            id: 'add-item',
          });
        },
      });
  }
}
