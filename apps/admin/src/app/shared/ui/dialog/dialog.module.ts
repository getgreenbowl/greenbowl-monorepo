import { NgModule } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import {
  GbDialogContainerComponent,
  GbDialogContentComponent,
  GbDialogDescriptionComponent,
  GbDialogFooterComponent,
  GbDialogHeaderComponent,
  GbDialogTitleComponent,
} from './dialog.component';

@NgModule({
  declarations: [
    GbDialogContainerComponent,
    GbDialogDescriptionComponent,
    GbDialogFooterComponent,
    GbDialogHeaderComponent,
    GbDialogTitleComponent,
    GbDialogContentComponent,
  ],
  imports: [DialogModule],
  exports: [
    GbDialogContainerComponent,
    GbDialogDescriptionComponent,
    GbDialogFooterComponent,
    GbDialogHeaderComponent,
    GbDialogTitleComponent,
    GbDialogContentComponent,
  ],
})
export class GbDialogModule {}
