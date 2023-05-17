import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { GbInputComponent } from '../shared/input/input.component';
import { AuthRoutingModule } from './authentication.routing';
import { GbButtonComponent } from '../shared/button/button.component';
import {ReactiveFormsModule} from "@angular/forms"

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, GbInputComponent, AuthRoutingModule, GbButtonComponent, ReactiveFormsModule],
})
export class AuthenticationModule {}


