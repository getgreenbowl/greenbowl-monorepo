import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/main/main.component';
import { SidebarComponent } from './layout/helpers/sidebar/sidebar.component';
import { HeaderComponent } from './layout/helpers/header/header.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkTreeModule } from '@angular/cdk/tree';
import { SgbButtonComponent } from './shared/ui/button';
import { SgbInputDirective } from './shared/ui/input/input.directive';
import { SgbIconComponent } from './shared/ui/icon';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CdkTreeModule,
    SgbButtonComponent,
    SgbInputDirective,
    SgbIconComponent,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
