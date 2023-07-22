import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { GbNotification } from 'src/app/shared/ui/notification/notification.service';
import { ItemsFormComponent } from './form/form.component';
import { ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'edit-items',
  template: ` <page-header
      header="Edit item"
      (save)="handleSubmit()"
      [loading]="false"
    />
    <items-form />`,
})
export class EditItemsComponent implements OnInit {
  @ViewChild(ItemsFormComponent) itemsComponent!: ItemsFormComponent;

  api = inject(ApiService);
  notif = inject(GbNotification);
  route = inject(ActivatedRoute);
  itemID!: number;
  private requests = new SubSink();

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.itemID = +id;
    this.fetchItem();
  }

  fetchItem() {
    this.api.get(`/items/${this.itemID}`).subscribe((response) => {
      this.itemsComponent.itemsForm.patchValue(response.data);
    });
  }

  handleSubmit() {
    const itemsForm = this.itemsComponent.itemsForm;
    if (itemsForm.invalid) {
      return;
    }
    this.requests.unsubscribe();
    this.notif.show({
      text: 'Updating item',
      id: 'update-item',
      type: 'loading',
      autoClose: false,
    });

    this.requests.sink = this.api
      .post<any[]>(`/items/update/${this.itemID}`, {
        ...itemsForm.value,
        isActive: true,
      })
      .subscribe({
        next: () => {
          console.log('item updated');

          this.notif.updateToast({
            text: 'Item updated',
            id: 'update-item',
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
