import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import clsx from 'clsx';

@Component({
  selector: 'gb-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card" >
      <div [class]="bodyClass">
        <div class="card-title">{{cardTitle}}</div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class GbCardComponent {

  @Input() c_body = '';
  get bodyClass() {
    return clsx('card-body', this.c_body);
  }


  @Input() cardTitle = ''

}
