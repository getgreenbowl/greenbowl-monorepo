import { NgModule } from '@angular/core';
import { NgStyle } from '@angular/common';
import { TooltipComponent } from './tooltip/tooltip.component';
import { TooltipDirective } from './tooltip.directive';

@NgModule({
  declarations: [TooltipComponent, TooltipDirective],
  imports: [NgStyle],
  exports: [TooltipDirective],
})
export class TooltipModule {}
