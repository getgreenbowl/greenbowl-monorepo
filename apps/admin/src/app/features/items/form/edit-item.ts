import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { GbNotification } from 'src/app/shared/ui/notification/notification.service';
import { ItemsFormComponent } from './form/form.component';
import { ActivatedRoute } from '@angular/router';
import { TItem, TItemWithIngredients } from 'greenbowl-schema';

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

  itemID!: string;

  ngOnInit(): void {
    this.itemID = this.route.snapshot.params['id'];
    this.getItem();
  }

  getItem() {
    this.api.get<TItemWithIngredients>(`/items/${this.itemID}`).subscribe({
      next: (response) => {
        const ingredients = response.data.ingredients?.map(
          (item) => item.ingredientID
        );
        this.itemsComponent.itemsForm.patchValue({
          ...response.data,
          ingredients,
        });
      },
    });
  }

  handleSubmit() {
    this.api
      .post(`/items/update/${this.itemID}`, this.itemsComponent.itemsForm.value)
      .subscribe({
        next: () => {
          this.notif.show({
            text: 'Item updated',
            id: 'update-item',
            type: 'success',
          });
        },
      });
    //
  }
}
