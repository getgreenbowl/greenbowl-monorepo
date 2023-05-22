import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataChartsComponent } from './data-charts/data-charts.component';

const routes: Routes = [{
  path: '',
  component: DataChartsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
