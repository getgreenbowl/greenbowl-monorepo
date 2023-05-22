import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { GbInputComponent } from 'src/app/shared/input/input.component';
import { GbButtonComponent } from 'src/app/shared/button/button.component';
import { GbInputDirective } from 'src/app/shared/input/directives/gb-input.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DashDataGridModule } from 'src/app/shared/data-grid/data-grid.module';
import { PageHeaderComponent } from 'src/app/shared/page-header/page-header.component';
import { InputGroupComponent } from 'src/app/shared/input-group/input-group.component';
import { GbGridShellComponent } from 'src/app/shared/grid-shell/grid-shell';
import { GbGridColumnsComponent } from 'src/app/shared/gb-data-grid/components/base-table/columns';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    GbInputComponent,
    GbButtonComponent,
    GbInputDirective,
    ReactiveFormsModule,
    DashDataGridModule,
    PageHeaderComponent,
    InputGroupComponent,
    GbGridShellComponent,
    GbGridColumnsComponent
  ],
})
export class MenuModule {}
