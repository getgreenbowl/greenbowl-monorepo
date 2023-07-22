import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GbNotification } from 'src/app/shared/ui/notification/notification.service';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  api = inject(ApiService);
  notif = inject(GbNotification);
  fb = inject(FormBuilder);

  showErrors = false;
  submitButton: 'submit' | 'loading' | 'added' | 'error' = 'submit';
  menuForm = this.fb.group({
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
  get menuFormControls() {
    return this.menuForm.controls;
  }

  handleSubmit() {
    if (this.menuForm.invalid) {
      this.showErrors = true;
      return;
    }
    this.notif.show({
      text: 'Adding item',
      id: 'add-item',
      type: 'loading',
    });

    this.api.post<any[]>('/items', this.menuForm.value).subscribe({
      next: () => {
        this.showErrors = false;
        this.menuForm.reset();
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
