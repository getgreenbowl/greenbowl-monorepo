import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SgbButtonComponent } from '../ui/button';
import { SgbIconComponent } from '../ui/icon';
import { Location } from '@angular/common';

@Component({
  selector: 'page-header',
  standalone: true,
  imports: [SgbButtonComponent, SgbIconComponent],
  template: `
    <div class="mb-3 flex justify-between">
      <h5 class="font-bold text-3xl pb-4">{{ header }}</h5>
      <div class="flex gap-3">
        <sgb-button (handleClick)="handleCancel()">
          <span class="flex items-center">
            <sgb-icon icon="arrow_back_ios" class="mt-1" />
            <p>Back</p>
          </span>
        </sgb-button>
        <sgb-button [loading]="loading" (handleClick)="save.emit()">
          <span class="flex items-center">
            <sgb-icon icon="hard_drive" class="mt-1 mr-1" />
            <p>Save</p>
          </span>
        </sgb-button>
      </div>
    </div>
  `,
})
export class PageHeaderComponent {

  constructor(private location: Location) {}

  @Input() header = '';
  @Input() loading = false;

  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();

  handleCancel() {
    if(this.cancel.observed) {
     return this.cancel.emit();
    }
    this.location.back()
  }

}
