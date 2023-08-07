import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DataChartsComponent } from './data-charts/data-charts.component';
import { GbCardModule } from 'src/app/shared/ui/card/card.module';
import { SgbIconComponent } from 'src/app/shared/ui/icon';
import { GbGridColumnsComponent } from 'src/app/shared/ui/gb-data-grid/components/base-table/columns';
import { GbDataGridModule } from 'src/app/shared/ui/gb-data-grid/gb-data-grid.module';
import { GbActionComponent } from 'src/app/shared/ui/gb-data-grid/components/base-table/action';
import { GbDropdownModule } from 'src/app/shared/ui/dropdown/dropdown.module';
import { SgbButtonComponent } from 'src/app/shared/ui/button';
import { GbSelectComponent } from 'src/app/shared/ui/form/gb-select';

@NgModule({
  declarations: [DataChartsComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    GbCardModule,
    SgbIconComponent,
    GbGridColumnsComponent,
    GbDataGridModule,
    GbActionComponent,
    GbDropdownModule,
    SgbButtonComponent,
    GbSelectComponent,
  ],
})
export class AnalyticsModule {}
