import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import {R_AdminLogin} from "@gb/schema"
import { HttpErrorResponse } from '@angular/common/http';
import { GbNotification } from 'src/app/shared/ui/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private ls: LocalStorageService,
    private notif: GbNotification
  ) {}

  showErrors = false;

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
  });

  handleSubmit() {
    if(this.loginForm.invalid) {
      this.showErrors = true;
      return
    }
    this.api.post<R_AdminLogin>('/admin-user/login', this.loginForm.value).subscribe({
      next: (data) => {
        this.ls.set('token', data.data.token);
        this.router.navigate(['/']);
      },
      error: (err:HttpErrorResponse) => {
          this.notif.show({
            text: err.error
          })
      }
    })
  }
}
