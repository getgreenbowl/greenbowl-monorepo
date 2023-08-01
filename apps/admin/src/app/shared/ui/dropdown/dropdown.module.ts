import { NgModule } from '@angular/core';
import { GbDropdownComponent, GbDropdownItemComponent } from './dropdown';
import { CdkMenuModule } from '@angular/cdk/menu';
import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { SgbIconComponent } from '../icon';

@NgModule({
  declarations: [GbDropdownComponent, GbDropdownItemComponent],
  imports: [
    CdkMenuModule,
    NgIf,
    NgFor,
    SgbIconComponent,
    NgTemplateOutlet,
    NgClass,
  ],
  exports: [GbDropdownComponent, GbDropdownItemComponent],
})
export class GbDropdownModule {}
