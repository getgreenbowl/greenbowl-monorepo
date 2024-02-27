import { Component, Input } from '@angular/core';
import { GbFormBaseComponent } from './base-form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControlPipe } from '../../pipe/form-control';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { GbHintComponent } from '../hint';
import { SgbIconComponent } from '../icon';

@Component({
  selector: 'gb-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormControlPipe,
    NgClass,
    NgIf,
    GbHintComponent,
    NgFor,
    SgbIconComponent,
  ],
  template: `<div>
    <label
      *ngIf="label"
      [for]="_id"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ml-1 capitalize"
    >
      {{ label }}
      <span class="text-red-600" *ngIf="required">*</span>
    </label>
    <div class="relative">
      <input
        class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        [id]="_id"
        [ngClass]="inputClass"
        [type]="type"
        [placeholder]="placeholder"
        [formControl]="control | formControl"
        [maxlength]="maxlength"
        [minlength]="minlength"
      />
      <sgb-icon
        icon="cancel"
        class="absolute end-2.5 bottom-[0.10rem] cursor-pointer"
        (click)="clear()"
        *ngIf="clearable && control.value"
      />
    </div>
    <gb-hint
      message="This is a required field"
      type="error"
      heading="ERROR"
      *ngIf="showErrors && errors?.['required']"
    />
    <gb-hint *ngFor="let hint of hints" [message]="hint" />
  </div>`,
})
export class GbInputComponent extends GbFormBaseComponent {
  @Input() maxlength = 524288;
  @Input() minlength = 0;
  @Input() type = 'text';
  @Input() inputClass = '';
  @Input() clearable = false;

  clear() {
    this.control.reset();
  }
}
