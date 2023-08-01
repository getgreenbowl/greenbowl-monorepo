import { NgModule } from '@angular/core';
import {
  SgbCardContentDirective,
  SgbCardDirective,
  SgbCardFooterDirective,
  SgbCardHeaderDirective,
  SgbCardTitleDirective,
} from './card.directive';

@NgModule({
  declarations: [
    SgbCardContentDirective,
    SgbCardDirective,
    SgbCardHeaderDirective,
    SgbCardFooterDirective,
    SgbCardTitleDirective,
  ],
  exports: [
    SgbCardContentDirective,
    SgbCardDirective,
    SgbCardHeaderDirective,
    SgbCardFooterDirective,
    SgbCardTitleDirective,
  ],
})
export class GbCardModule {}
