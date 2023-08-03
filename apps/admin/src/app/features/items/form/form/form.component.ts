import { Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { GbNotification } from 'src/app/shared/ui/notification/notification.service';
import { GbSelectComponent } from 'src/app/shared/ui/form/gb-select';

@Component({
  selector: 'items-form',
  templateUrl: './form.component.html',
})
export class ItemsFormComponent {
  @ViewChild('addMenu', { static: true }) addmenu!: ComponentType<any>;
  @ViewChild('menuSelect', { static: true }) menuSelect!: GbSelectComponent;

  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);
  private api = inject(ApiService);
  private notif = inject(GbNotification);

  showErrors = false;
  menuDialogRef!: DialogRef<any>;

  menuName = new FormControl('', Validators.required);

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
    ingredients: new FormControl([]),
  });
  get itemsFormControls() {
    return this.itemsForm.controls;
  }

  openDialog() {
    this.menuDialogRef = this.dialog.open(this.addmenu, {
      panelClass: 'bg-red-500',
    });
    this.menuDialogRef.backdropClick.subscribe((e) => {
      console.log(e, 'backdrop');
    });
  }

  close() {
    if (!this.menuDialogRef) {
      return;
    }
    this.menuDialogRef.close();
  }

  handleMenuSubmit() {
    this.api.post('/menu', { name: this.menuName.value }).subscribe({
      next: () => {
        this.menuSelect.getItems();
        this.menuName.reset();
        this.menuDialogRef.close();
        this.notif.show({
          text: 'Menu added',
          type: 'success',
          id: 'add-menu',
        });
      },
    });
  }
}
