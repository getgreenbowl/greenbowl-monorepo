import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
// import { TMenu } from 'greenbowl-schema';
import { map } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  constructor(private fb: FormBuilder, private api: ApiService) {}

  showErrors = false;
  menu$ = this.api.get<any>('/menu').pipe(map((res) => res.data));
  ingredients$ = this.api.get<any>('/ingredients').pipe(map((res) => res.data));
  submitButton: 'submit'|'loading'|'added'|'error' = 'submit'
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
    if(this.menuForm.invalid) {
    this.showErrors = true;
      return
    }
    this.submitButton = 'loading';
    this.api.post<any[]>('/items', this.menuForm.value).subscribe({
      next: () => {
        this.showErrors = false;
        this.submitButton = 'added';
        setTimeout(() => {
          this.submitButton = 'submit'
        }, 1500);
        this.menuForm.reset();
      },
      error: (err) => {
        console.log(err);
        this.submitButton = 'error';
        setTimeout(() => {
          this.submitButton = 'submit'
        }, 1500);
        alert(err.error)
      }
    })
    console.log(this.menuForm.value, 'form value');
  }
}
