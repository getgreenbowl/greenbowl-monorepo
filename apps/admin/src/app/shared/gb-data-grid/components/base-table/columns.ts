import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'gb-column',
  standalone: true,
  template: '',
})
export class GbGridColumnsComponent {
  @Input() title = ''
  @Input() field = ''
  @Input() sortable?:boolean = false
  @Input() visible?:boolean = true
  @Input() alignment?: 'center'|'right'|'left' = 'center'
  @ContentChild('head') head?: TemplateRef<any>
  @ContentChild('cell') cell?: TemplateRef<any>
 }
