import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './authentication.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { SgbButtonComponent } from 'src/app/shared/ui/button';
import { SgbInputDirective } from 'src/app/shared/ui/input/input.directive';
import { SgbInputWrapperComponent } from 'src/app/shared/ui/input/input-wrapper.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SgbButtonComponent,
    SgbInputDirective,
    SgbInputWrapperComponent,
  ],
})
export class AuthenticationModule {}
