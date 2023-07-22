import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { generateAndPatchValues } from 'src/app/dev/generate-values-dev';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'gb-form',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      (click)="patchRandomValues()"
      *ngIf="!environment.production"
      class="cursor-pointer"
      >Fill random values</a
    >
    <form [formGroup]="form">
      <ng-content></ng-content>
    </form>
  `,
})
export class GbFormComponent {
  @Input() form!: FormGroup;
  environment = environment;

  patchRandomValues() {
    if (!environment.production) {
      generateAndPatchValues(this.form.controls);
    }
  }
}
