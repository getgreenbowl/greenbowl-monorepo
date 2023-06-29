import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'btn-icon',
  styleUrls: ['../../data-grid.component.scss'],
  template:  `<button
  class="btn btn-icon"
  [title]="title"
  (click)="handleClick.emit($event)"
>
</button>`
})

export class ButtonIconComponent {
  @Input() icon = ''
  @Input() title = ''

  @Output() handleClick = new EventEmitter();

}
