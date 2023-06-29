import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private api: ApiService, private router: Router, private ls: LocalStorageService) {}

  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  });


  handleSuccess() {
    this.ls.set('token', 'gb_dummy_token');
    this.router.navigate(['/'])
  }

    handleSubmit() {
      this.handleSuccess()
      // this.api.post('/login', this.loginForm.value).subscribe({
      //   next: () => {},
      //   error: () => {}
      // })


    }

}
