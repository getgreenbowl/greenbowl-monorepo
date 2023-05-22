import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gb-button',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./button.component.scss'],
  template: `
  <button [class]="cssClass" [type]="type" [disabled]="disabled" (click)="handleClick.emit($event)" >
    <ng-content></ng-content>
  </button>
  `
})
export class GbButtonComponent {

  _cssClass = {
    default: 'btn',
    inverse: 'btn inverse'
  }

  @Output() handleClick = new EventEmitter();
  @Input() type: 'submit'|'button' = 'submit'
  @Input() disabled = false
  @Input() variant: keyof typeof this._cssClass = 'default'
  get cssClass() {
    return this._cssClass[this.variant]
  }

}
