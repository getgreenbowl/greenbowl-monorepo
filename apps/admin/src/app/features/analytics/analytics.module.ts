import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyticsRoutingModule } from './analytics-routing.module';
import { DataChartsComponent } from './data-charts/data-charts.component';
import { GbCardComponent } from 'src/app/shared/card/card.component';
import {SgbButtonComponent} from "gb-ngx-ui"

@NgModule({
  declarations: [
    DataChartsComponent
  ],
  imports: [
    CommonModule,
    AnalyticsRoutingModule,
    GbCardComponent,
    SgbButtonComponent
  ]
})
export class AnalyticsModule { }
