import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'sgb-btn-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [title]="text"
      (click)="handleClick.emit($event)"
      type="button"
      [class]="styles"
      [ngClass]="{
        'dark:bg-gray-900 bg-gray-50 dark:hover:bg-gray-900 hover:bg-gray-50': active,
        'bg-background dark:hover:bg-gray-900 hover:bg-gray-50': !active
      }"
    >
      <sgb-icon [icon]="icon" *ngIf="icon" />
      <ng-container *ngIf="text && !icon">
      {{ text }}
      </ng-container>
    </button>
  `,
})
export class SgbBtnGroupComponent {
  readonly styles = "border-e px-2 py-1 text-sm font-medium focus:relative"
  @Input() text = '';
  @Input() icon = '';
  @Input() active = false

  @Output() handleClick = new EventEmitter();
}
