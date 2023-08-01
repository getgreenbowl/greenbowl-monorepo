import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  template: `<div
    class="tooltip"
    [class]="class"
    [ngStyle]="{ 'max-width': maxWidth + 'px', 'min-width': minWidth + 'px' }"
  >
    {{ sgbTooltip }}
  </div> `,
  styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
  /**
   * tooltip value that is be visible in tooltip items.
   */
  sgbTooltip = '';
  /**
   * default class is set to tooltip-top
   * becuase we have set placement default value as top in directive.
   */
  class = 'tooltip-top';
  /**
   * maxWidth that tooltip can take.
   * default value will be set to 200
   */
  @Input()
  maxWidth = 200;

  /**
   * maxWidth that tooltip can take.
   * default value will be set to 200
   */
  @Input()
  minWidth = 100;
}
