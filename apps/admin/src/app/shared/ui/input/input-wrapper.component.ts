import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { mergetw } from '../../utils/tw-merge';

@Component({
  selector: 'sgb-input-wrapper, [sgb-input-wrapper]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIf],
  template: `<div [class]="_containerStyle">
    <label *ngIf="label" [for]="id" [class]="_labelStyle">
      {{ label }}
      <span class="text-danger" *ngIf="required">*</span>
    </label>
    <ng-content></ng-content>
    <small *ngIf="errors?.['required']"> This field is required </small>
  </div>`,
})
export class SgbInputWrapperComponent {
  @Input() label = '';
  @Input() containerStyle = '';
  @Input() id = '';

  get _containerStyle() {
    return mergetw(this.containerStyle);
  }

  @Input() labelStyle = '';
  get _labelStyle() {
    return mergetw(this.labelStyle);
  }

  @Input() control!: FormControl | AbstractControl;
  get errors() {
    return this.control.errors;
  }

  /**
   * @Determines if the field is required or not
   */
  get required() {
    if (this.control.validator) {
      const validator = this.control.validator({} as AbstractControl);
      if (validator?.['required']) {
        return validator['required'];
      }
      return this.control.validator({} as AbstractControl);
    }
    return false;
  }
}
