import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { DashDataGridModule } from 'src/app/shared/data-grid/data-grid.module';
import { PageHeaderComponent } from 'src/app/shared/page-header/page-header.component';
import { GbGridShellComponent } from 'src/app/shared/grid-shell/grid-shell';
import { GbGridColumnsComponent } from 'src/app/shared/gb-data-grid/components/base-table/columns';
import { GbGridToolbarComponent } from 'src/app/shared/gb-data-grid/components/toolbar/gb-toolbar';
// import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    DashDataGridModule,
    PageHeaderComponent,
    GbGridShellComponent,
    GbGridColumnsComponent,
    GbGridToolbarComponent,
    // NgSelectModule
  ],
})
export class MenuModule {}
