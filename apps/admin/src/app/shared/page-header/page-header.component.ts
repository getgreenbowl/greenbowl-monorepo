import { Component, Input } from "@angular/core";
import { BackButtonComponent } from "../back-button/back-button.component";

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [BackButtonComponent],
  template: `
    <div class="d-flex justify-content-between">
      <h5>{{header}}</h5>
      <back-button />
    </div>
  `
})

export class PageHeaderComponent {
  @Input() header = ''
}
