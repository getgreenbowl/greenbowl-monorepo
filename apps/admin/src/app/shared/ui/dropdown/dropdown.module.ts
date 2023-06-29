import { NgModule } from '@angular/core';
import { SgbDropdownContentDirective, SgbDropdownItemDirective } from './dropdown.directive';

@NgModule({
  declarations: [SgbDropdownContentDirective, SgbDropdownItemDirective],
  exports: [SgbDropdownContentDirective, SgbDropdownItemDirective],
})
export class DropdownModule {}
