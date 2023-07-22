import { ChangeDetectionStrategy, Component } from "@angular/core";
import {CdkMenuModule} from '@angular/cdk/menu';

@Component({
  selector: 'gb-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CdkMenuModule],
  template: `<button [cdkMenuTriggerFor]="menu" class="example-standalone-trigger">
    asdasd
  </button>

  <ng-template #menu>
    <div class="example-menu" cdkMenu>
      <button class="example-menu-item" cdkMenuItem>Refresh</button>
      <button class="example-menu-item" cdkMenuItem>Settings</button>
      <button class="example-menu-item" cdkMenuItem>Help</button>
      <button class="example-menu-item" cdkMenuItem>Sign out</button>
    </div>
  </ng-template>`
})

export class GbDropdownComponent {}
