import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Component({
  selector: 'items-form',
  templateUrl: './form.component.html',
})
export class ItemsFormComponent {
  @ViewChild('addMenu', { static: true }) addmenu!: ComponentType<any>;

  private fb = inject(FormBuilder);
  private dialog = inject(Dialog);

  showErrors = false;
  menuDialogRef!: DialogRef<any>;

  itemsForm = this.fb.group({
    menuID: [null, Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, Validators.required],
    protien: [null, Validators.required],
    fat: [null, Validators.required],
    energy: [null, Validators.required],
    carbs: [null, Validators.required],
    calories: [null, Validators.required],
    ingredients: [[]],
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
}
