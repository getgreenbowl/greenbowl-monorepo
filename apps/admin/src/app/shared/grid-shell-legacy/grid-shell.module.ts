import { NgModule } from '@angular/core';
import { GridShellComponent } from './grid-shell.component';
import { CommonModule } from '@angular/common';
import { DashDataGridModule } from '../data-grid/data-grid.module';

@NgModule({
  imports: [DashDataGridModule, CommonModule],
  declarations: [GridShellComponent],
  exports: [GridShellComponent],
})
export class GridShellModule {}
