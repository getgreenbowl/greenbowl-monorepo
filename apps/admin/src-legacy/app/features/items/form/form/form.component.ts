import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'items-form',
  templateUrl: './form.component.html',
})
export class ItemsFormComponent {
  private fb = inject(FormBuilder);

  showErrors = false;

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
    files: ['', Validators.required],
    ingredients: [[]],
  });
  get itemsFormControls() {
    return this.itemsForm.controls;
  }
}
