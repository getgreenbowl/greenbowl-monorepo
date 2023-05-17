import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'btn-icon',
  styleUrls: ['../../data-grid.component.scss'],
  template:  `<button
  class="btn btn-sm btn-icon btn-secondary"
  [title]="title"
  (click)="onClick.emit($event)"
>
  <lucide-icon [name]="icon"></lucide-icon>
</button>`
})

export class ButtonIconComponent {
  @Input() icon: string = ''
  @Input() title: string = ''

  @Output() onClick = new EventEmitter();

}
