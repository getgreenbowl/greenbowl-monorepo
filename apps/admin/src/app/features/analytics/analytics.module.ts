import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DataChartsComponent } from './data-charts/data-charts.component';
import { GbCardComponent } from 'src/app/shared/card/card.component';


@NgModule({
  declarations: [
    DataChartsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    GbCardComponent
  ]
})
export class AnalyticsModule { }
