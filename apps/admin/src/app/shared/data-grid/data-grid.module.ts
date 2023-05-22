import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashDataGridComponent } from './data-grid.component';
import { LimitsComponent } from './components/limits.component';
import { GridHeaderComponent } from './components/header.component';
import { GridDataComponent } from './components/data.component';
import { GridFilterComponent } from './components/filter.component';
import { GetItemsPipe } from './pipes/dropdown-items.pipe';
import { RenderPipe } from './pipes/renderer.pipe';
import { classRenderPipe } from './pipes/classRender.pipe';

import { ColumnOptionsComponent } from './components/column-options.component';
import { GridLoader } from './components/loader.component';
import { RenderTitlePipe } from './pipes/render-title.pipe';
import { ActionButtonComponent } from './components/action.component';
import { GridToolbarComponent } from './components/toolbar.component';
import { DataGridService } from './data-grid.service';
import { IfDataComponent } from './components/subs/if-data.component';
import { ButtonIconComponent } from './components/subs/btn-icon.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [DataGridService],
  declarations: [
    ButtonIconComponent,
    GridLoader,
    ColumnOptionsComponent,
    DashDataGridComponent,
    LimitsComponent,
    GridHeaderComponent,
    GridDataComponent,
    GridFilterComponent,
    GridFilterComponent,
    GetItemsPipe,
    RenderPipe,
    RenderTitlePipe,
    classRenderPipe,
    ActionButtonComponent,
    GridToolbarComponent,
    IfDataComponent,
  ],
  exports: [DashDataGridComponent],
})
export class DashDataGridModule {}
