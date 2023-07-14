import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { cva, VariantProps } from 'class-variance-authority';
import { SgbIconComponent } from './icon';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 w-full',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 w-full',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground w-full',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

@Component({
  selector: 'sgb-button',
  standalone: true,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, SgbIconComponent],
  template: `<button
      [type]="type"
      [disabled]="disabled"
      (click)="handleClick.emit($event)"
      [class]="defaultClass"
    >
      <ng-content></ng-content>
    </button>`,
})
export class SgbButtonComponent implements OnChanges {
  @Output() handleClick = new EventEmitter();
  @Input() type: 'submit' | 'button' = 'submit';
  @Input() disabled = false;
  @Input() variant: VariantProps<typeof buttonVariants>['variant'] = 'default';
  @Input() loading = false;

  protected defaultClass = buttonVariants({ variant: this.variant });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['variant']?.currentValue) {
      this.defaultClass = buttonVariants({
        variant: changes['variant'].currentValue,
      });
    }

    if (
      changes['loading']?.currentValue ||
      changes['loading']?.currentValue === false
    ) {
      this.disabled = changes['loading']?.currentValue;
    }
  }
}
