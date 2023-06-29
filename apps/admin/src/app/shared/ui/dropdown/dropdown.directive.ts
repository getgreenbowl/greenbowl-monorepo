import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'sgb-dropdown-content',
})
export class SgbDropdownContentDirective {
  @HostBinding('class') classes =
    'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';
}

@Directive({
  selector: 'sgb-dropdown-item',
})
export class SgbDropdownItemDirective {
  @HostBinding('class') classes =
    'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';
}
