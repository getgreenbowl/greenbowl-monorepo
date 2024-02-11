import {
  Component,
  Input,
  ContentChild,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'gb-toolbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export class GbGridToolbarComponent {
  @Input() icon = '';
  @Input() name?: string = '';
  @Input() _tool?: TemplateRef<GbGridToolbarComponent>;

  @Output() handleClick = new EventEmitter();

  @ContentChild('tool') tool?: TemplateRef<GbGridToolbarComponent>;
}
