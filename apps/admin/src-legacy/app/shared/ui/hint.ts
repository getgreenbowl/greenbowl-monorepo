import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";

@Component({
  selector: 'gb-hint',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf],
  template: `<div class="flex items-center">
  <div class="w-[4px] rounded-xl m-1" [class]="styles.sideDiv"></div>
  <div class="flex flex-col">
    <small class="text-[10px] tracking-wide" [class]="styles.heading" *ngIf="heading" >{{heading}}</small>
    <small class="italic" [class]="styles.message">
      {{message}}
    </small>
  </div>
</div>`
})

export class GbHintComponent {

 readonly hintStyle = {
    sideDiv: 'bg-slate-300 h-6',
    heading: 'text-slate-400',
    message: 'text-slate-500'
  } as const

  readonly errorStyle = {
    sideDiv: 'bg-red-600 h-8',
    heading: 'text-red-600',
    message: 'text-slate-500'
  } as const

  @Input() heading = ''
  @Input() message = ''
  @Input() type: 'error' | 'hint' = 'hint';
  get styles() {
    if(this.type === 'error') {
      return this.errorStyle
    }
    return this.hintStyle
  }
}
