import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'input-group',
  standalone: true,
  template: `
  <div>
    <p class="h6">{{header}}</p>
    <div class="row">
      <ng-content></ng-content>
    </div>
  </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InputGroupComponent {
  @Input() header = ''
}
