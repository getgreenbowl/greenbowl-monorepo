import { NgModule } from "@angular/core"
import { SgbBtnGroupComponent } from "./btn-group";
import { SgbBtnGroupContainerComponent } from "./btn-group-container";
import { NgFor, NgIf } from "@angular/common";
import { SgbIconComponent } from "../icon";
@NgModule({
  declarations: [SgbBtnGroupComponent, SgbBtnGroupContainerComponent],
  imports: [NgIf, NgFor, SgbIconComponent],
  exports: [SgbBtnGroupComponent, SgbBtnGroupContainerComponent],
})
export class SgbBtnGroupModule {}
