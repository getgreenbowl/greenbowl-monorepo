import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { GbGridColumnsComponent } from './columns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'gb-action',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: ` <ng-container *ngIf="action">
      <ng-container
        *ngTemplateOutlet="
          action;
          context: { $implicit: icon, column, cellData }
        "
      ></ng-container>
    </ng-container>
    <i
      *ngIf="!action"
      [class]="icon + ' fa-xs pointer px-1'"
      [title]="tooltip || 'action'"
      (click)="handleClick.emit({cellData, column})"
    ></i>`,
})
export class GbActionComponent {
  @Input() icon!: string;
  @Input() tooltip = '';
  @Input() cellData?: any;
  @Input() column?: GbGridColumnsComponent;
  @Input() action:TemplateRef<GbActionComponent> | null = null;

  @Output() handleClick = new EventEmitter();

  @ContentChild('template') _action: TemplateRef<GbActionComponent> | null = null;

}
