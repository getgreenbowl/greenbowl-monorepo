import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { PageHeaderComponent } from '../../shared/ui/page-header.component';
import { GbGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { GbGridColumnsComponent } from '../../shared/ui/gb-data-grid/components/base-table/columns';
import { GbGridToolbarComponent } from '../../shared/ui/gb-data-grid/components/toolbar/gb-toolbar';
import { GbInputComponent } from '../../shared/ui/form/input';
import { SgbButtonComponent } from '../../shared/ui/button';
import { SgbIconComponent } from '../../shared/ui/icon';
import { GbSelectComponent } from 'src/app/shared/ui/form/gb-select';
import { GbActionComponent } from 'src/app/shared/ui/gb-data-grid/components/base-table/action';
import { GbTextareaComponent } from 'src/app/shared/ui/form/textarea';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    GbGridShellComponent,
    GbGridColumnsComponent,
    GbGridToolbarComponent,
    GbInputComponent,
    SgbButtonComponent,
    SgbIconComponent,
    GbSelectComponent,
    GbActionComponent,
    GbTextareaComponent,
  ],
})
export class MenuModule {}
