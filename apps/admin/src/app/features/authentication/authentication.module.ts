import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './authentication.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SgbButtonComponent } from 'src/app/shared/ui/button';
import { GbInputComponent } from 'src/app/shared/ui/form/gb-input';
import { SgbIconComponent } from 'src/app/shared/ui/icon';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SgbButtonComponent,
    GbInputComponent,
    SgbIconComponent,
  ],
})
export class AuthenticationModule {}
