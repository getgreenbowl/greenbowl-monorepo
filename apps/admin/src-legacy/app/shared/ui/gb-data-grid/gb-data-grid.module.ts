import { NgModule } from '@angular/core';
import { GridDataService } from './services/data.service';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { GbDataGridComponent } from './gb-data-grid.component';
import { BaseDataTableComponent } from './components/base-table/base-table';
import { GridColumnService } from './services/columns.service';
import { GbGridColumnsComponent } from './components/base-table/columns';
import { ActionService } from './services/actions.service';
import { LoadingService } from './services/loading.service';
import { ToolbarService } from './services/toolbar.service';
import { GbTableFooterComponent } from './components/footer/footer';
import { GbPaginationComponent } from './components/pagination/pagination';
import { GbGridLimitComponent } from './components/limit/limit';
import { PaginationService } from './services/pagination.service';
import { MetaDataService } from './services/meta-data.service';
import { GbActionComponent } from './components/base-table/action';
import { GridToolbarComponent } from './components/toolbar/toolbar';
import { GbGridToolbarComponent } from './components/toolbar/gb-toolbar';
import { SgbBtnGroupModule } from '../button-group/btn-group.module';

@NgModule({
  declarations: [
    GbDataGridComponent,
    BaseDataTableComponent,
    GbTableFooterComponent,
    GbPaginationComponent,
    GbGridLimitComponent,
    GridToolbarComponent,
  ],
  imports: [
    CdkTableModule,
    CommonModule,
    GbGridColumnsComponent,
    GbActionComponent,
    GbGridToolbarComponent,
    SgbBtnGroupModule,
  ],
  providers: [
    GridDataService,
    GridColumnService,
    ActionService,
    LoadingService,
    ToolbarService,
    MetaDataService,
    PaginationService,
  ],
  exports: [GbDataGridComponent],
})
export class GbDataGridModule {}
