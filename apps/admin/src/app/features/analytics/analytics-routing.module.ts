import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataChartsComponent } from './data-charts/data-charts.component';
import { DatePipe } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: DataChartsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), DatePipe],
  exports: [RouterModule],
})
export class AnalyticsRoutingModule {}
