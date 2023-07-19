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
import { NgIf } from '@angular/common';
import { SgbIconComponent } from 'src/app/shared/ui/icon';

@Component({
  selector: 'gb-action',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, SgbIconComponent],
  template: ` <ng-container *ngIf="action">
      <ng-container
        *ngTemplateOutlet="
          action;
          context: { $implicit: icon, column, cellData }
        "
      ></ng-container>
    </ng-container>
    <sgb-icon
      *ngIf="!action"
      (click)="handleClick.emit({cellData, column})"
      [icon]="icon"
      [title]="tooltip"
      class="cursor-pointer"
    />`,
})
export class GbActionComponent {
  @Input() icon!: string;
  @Input() tooltip = '';
  @Input() cellData?: any;
  @Input() column?: GbGridColumnsComponent;
  @Input() action: TemplateRef<GbActionComponent> | null = null;

  @Output() handleClick = new EventEmitter();

  @ContentChild('template') _action: TemplateRef<GbActionComponent> | null =
    null;
}
