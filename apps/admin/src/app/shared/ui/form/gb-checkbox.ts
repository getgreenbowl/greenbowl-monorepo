import { Component, Input } from '@angular/core';
import { GbFormBaseComponent } from './base-form';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { GbHintComponent } from '../hint';
import { ReactiveFormsModule } from '@angular/forms';
import { mergetw } from '../../utils/tw-merge';
import { FormControlPipe } from '../../pipe/form-control';
import { SgbIconComponent } from '../icon';

@Component({
  selector: 'gb-checkbox',
  standalone: true,
  imports: [
    NgClass,
    GbHintComponent,
    ReactiveFormsModule,
    FormControlPipe,
    NgIf,
    SgbIconComponent,
    NgForOf,
  ],
  template: `<div class="flex items-center space-x-2">
    <label
      [for]="label"
      *ngIf="labelPlacement === 'left'"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >{{ label }}</label
    >
    <button
      type="button"
      role="checkbox"
      class="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
      [id]="label"
      (click)="handleClick()"
    >
      <sgb-icon icon="check_box" size="lg" *ngIf="control.value" />
      <sgb-icon
        icon="check_box_outline_blank"
        size="lg"
        *ngIf="!control.value"
      />
    </button>
    <label
      [for]="label"
      *ngIf="labelPlacement === 'right'"
      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
      >{{ label }}</label
    >
    <gb-hint
      message="This is a required field"
      type="error"
      heading="ERROR"
      *ngIf="showErrors && errors?.['required']"
    />
    <gb-hint *ngFor="let hint of hints" [message]="hint" />
  </div>`,
})
export class GbCheckboxComponent extends GbFormBaseComponent {
  @Input() labelPlacement: 'right' | 'left' = 'right';
  @Input() inputClass = '';
  get baseClass() {
    return mergetw(
      'flex h-9 w-full rounded-md border border-input px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      this.inputClass
    );
  }

  handleClick() {
    this.control.patchValue(Boolean(!this.control.value));
  }
}
