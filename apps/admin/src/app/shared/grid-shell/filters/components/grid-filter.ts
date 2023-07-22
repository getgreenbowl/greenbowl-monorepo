import { Component, Input } from '@angular/core';
import { AllowedFilterTypes } from '../types';

@Component({
  selector: 'gb-grid-filter',
  standalone: true,
  template: '',
})
export class GbGridFilterComponent {
  @Input() type: AllowedFilterTypes = 'text';
  @Input() label = '';
  @Input() field!: string;
  @Input() hints: string[] = [];
  @Input() placeholder = '';

  @Input() maxlength = 524288;
  @Input() minlength = 0;
}
