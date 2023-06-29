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
          context: { icon, column, cellData, handleClick, tooltip  }
        "
      ></ng-container>
    </ng-container>
    <span
    *ngIf="!action"
    class="material-symbols-sharp"
    (click)="handleClick.emit({cellData, column})"
    [title]="tooltip || 'action'"
    >
{{icon}}
</span>`,
})
export class GbActionComponent {
  @Input() icon!: string;
  @Input() tooltip = '';
  @Input() cellData?: any;
  @Input() column?: GbGridColumnsComponent;
  @Input() action?:TemplateRef<GbActionComponent> | null = null;

  @Output() handleClick = new EventEmitter();

  @ContentChild('template') _action?: TemplateRef<GbActionComponent> | null = null;

}
