import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { GbInputDirective } from './directives/gb-input.directive';
import { ShowErrorDirective } from './directives/show-errors.directive';

@Component({
  selector: 'gb-input',
  standalone: true,
  imports: [CommonModule, ShowErrorDirective, GbInputDirective],
  template: `<div
    [class]="_containerStyle"
    [showError]="showError && control.invalid"
    gbinput
  >
    <label [for]="id" [class]="_labelStyle">
      {{ label }}
      <span class="text-danger" *ngIf="required">*</span>
    </label>
    <ng-content></ng-content>
    <small class="invalid-feedback" *ngIf="errors?.['required']">
      This field is required
    </small>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GbInputComponent implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  @Input() label: string = '';
  @Input() hints?: string;
  @Input() showError: boolean = false;
  @Input() id: string = '';

  @Input() containerStyle: string = '';
  get _containerStyle() {
    return this.mergeString(this.containerStyle, 'mb-3 has-validation');
  }

  @Input() labelStyle: string = '';
  get _labelStyle() {
    return this.mergeString(this.labelStyle, 'small text-muted mb-1');
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

  subs = new SubSink();

  private mergeString(incoming: string = '', defaultValue: string) {
    return `${incoming} ${defaultValue}`;
  }

  private detectChanges() {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    this.subs.sink = this.control.valueChanges.subscribe((data) => {
      this.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
