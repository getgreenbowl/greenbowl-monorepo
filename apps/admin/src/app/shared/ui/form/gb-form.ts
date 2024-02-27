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
      class="cursor-pointer bg-primary hover:bg-primary/80 border-transparent text-primary-foreground inline-flex items-center border rounded-sm px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
