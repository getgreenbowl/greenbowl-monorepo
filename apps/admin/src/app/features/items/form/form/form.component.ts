import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ApiService } from 'src/app/shared/services/api.service';
import { GbNotification } from 'src/app/shared/ui/notification/notification.service';
import { GbSelectComponent } from 'src/app/shared/ui/form/gb-select';

@Component({
  selector: 'items-form',
  templateUrl: './form.component.html',
})
export class ItemsFormComponent {
  @ViewChild('menuSelect', { static: true }) menuSelect!: GbSelectComponent;
  @ViewChild('ingredients', { static: true }) ingredients!: GbSelectComponent;

  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);
  private api = inject(ApiService);
  private notif = inject(GbNotification);

  showErrors = false;
  dialogRef!: DialogRef<any>;

  menuName = new FormControl('', Validators.required);
  ingredientName = new FormControl('', Validators.required);

  itemsForm = this.fb.group({
    menuID: new FormControl<number | null>(null, Validators.required),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl<number | null>(null, Validators.required),
    protien: new FormControl<number | null>(null, Validators.required),
    fat: new FormControl<number | null>(null, Validators.required),
    energy: new FormControl<number | null>(null, Validators.required),
    carbs: new FormControl<number | null>(null, Validators.required),
    calories: new FormControl<number | null>(null, Validators.required),
    ingredients: new FormControl<number[]>([]),
    isActive: new FormControl(true),
  });
  get itemsFormControls() {
    return this.itemsForm.controls;
  }

  openDialog(ref: any) {
    this.dialogRef = this.dialog.open(ref);
  }

  close() {
    if (!this.dialogRef) {
      return;
    }
    this.dialogRef.close();
  }

  handleMenuSubmit() {
    this.api.post('/menu', { name: this.menuName.value }).subscribe({
      next: () => {
        this.menuSelect.getItems();
        this.menuName.reset();
        this.dialogRef.close();
        this.notif.show({
          text: 'Menu added',
          type: 'success',
          id: 'add-menu',
        });
      },
    });
  }

  handleIngredientSubmit() {
    this.api
      .post('/ingredient', { name: this.ingredientName.value })
      .subscribe({
        next: () => {
          this.ingredients.getItems();
          this.ingredientName.reset();
          this.dialogRef.close();
          this.notif.show({
            text: 'Ingredient added',
            type: 'success',
            id: 'add-menu',
          });
        },
      });
  }
}
