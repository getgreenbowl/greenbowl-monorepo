import { NgClass, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'sgb-icon',
  standalone: true,
  imports: [NgStyle, NgClass],
  template: `<i
    class="material-symbols-rounded mt-1"
    [ngClass]="iconClass"
    [ngStyle]="{ 'font-size': sizes[size] }"
  >
    {{ icon }}
  </i>`,
})
export class SgbIconComponent {
  protected sizes = {
    sm: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
  };

  @Input() icon = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() iconClass!: any;
}
