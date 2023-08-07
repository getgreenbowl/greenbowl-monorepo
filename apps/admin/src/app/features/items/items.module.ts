import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { PageHeaderComponent } from '../../shared/ui/page-header.component';
import { GbGridShellComponent } from '../../shared/grid-shell/grid-shell';
import { GbGridColumnsComponent } from '../../shared/ui/gb-data-grid/components/base-table/columns';
import { GbGridToolbarComponent } from '../../shared/ui/gb-data-grid/components/toolbar/gb-toolbar';
import { GbInputComponent } from '../../shared/ui/form/gb-input';
import { SgbButtonComponent } from '../../shared/ui/button';
import { SgbIconComponent } from '../../shared/ui/icon';
import { GbSelectComponent } from 'src/app/shared/ui/form/gb-select';
import { GbActionComponent } from 'src/app/shared/ui/gb-data-grid/components/base-table/action';
import { GbTextareaComponent } from 'src/app/shared/ui/form/textarea';
import { ItemsFormComponent } from './form/form/form.component';
import { AddItemsComponent } from './form/add-item';
import { EditItemsComponent } from './form/edit-item';
import { GbFormComponent } from 'src/app/shared/ui/form/gb-form';
import { GbGridFilterComponent } from 'src/app/shared/grid-shell/filters/components/grid-filter';
import { GbDialogModule } from 'src/app/shared/ui/dialog/dialog.module';
import { GbBadgeComponent } from 'src/app/shared/ui/badge';
import { GbCheckboxComponent } from 'src/app/shared/ui/form/gb-checkbox';

@NgModule({
  declarations: [
    ListComponent,
    ItemsFormComponent,
    AddItemsComponent,
    EditItemsComponent,
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
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
    GbFormComponent,
    GbGridFilterComponent,
    GbDialogModule,
    GbBadgeComponent,
    GbCheckboxComponent,
  ],
})
export class ItemsModule {}
