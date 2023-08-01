import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdkMenuModule } from '@angular/cdk/menu';

@Component({
  selector: 'gb-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CdkMenuModule],
  template: `<span
      [cdkMenuTriggerFor]="items"
      class="example-standalone-trigger"
    >
      <ng-content></ng-content>
    </span>

    <ng-template #items>
      <div
        class="flex flex-col gap-2 items-start z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md"
        cdkMenu
      >
        <button
          cdkMenuItem
          class="w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
          Profile
        </button>
        <button
          cdkMenuItem
          class="w-full relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        >
          Logout
        </button>
      </div>
    </ng-template>`,
})
export class GbDropdownComponent {}
