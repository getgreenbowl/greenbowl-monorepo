import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DataChartsComponent } from './data-charts/data-charts.component';
import { CardModule } from 'src/app/shared/ui/card/card.module';
import { SgbIconComponent } from 'src/app/shared/ui/icon';
import { GbGridColumnsComponent } from 'src/app/shared/ui/gb-data-grid/components/base-table/columns';
import { GbDataGridModule } from 'src/app/shared/ui/gb-data-grid/gb-data-grid.module';
import { GbActionComponent } from 'src/app/shared/ui/gb-data-grid/components/base-table/action';
import { GbDropdownComponent } from 'src/app/shared/ui/dropdown';

@NgModule({
  declarations: [DataChartsComponent],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    CardModule,
    SgbIconComponent,
    GbGridColumnsComponent,
    GbDataGridModule,
    GbActionComponent,
    GbDropdownComponent,
  ],
})
export class AnalyticsModule {}
