import {Component, OnChanges, Input, SimpleChanges} from "@angular/core"
import { cva, VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center border rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/80 border-transparent text-primary-foreground",
        secondary:
          "bg-secondary hover:bg-secondary/80 border-transparent text-secondary-foreground",
        destructive:
          "bg-destructive hover:bg-destructive/80 border-transparent text-destructive-foreground",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

@Component({
  selector: 'sgb-badge',
  standalone: true,
  template: `<div [class]="defaultClass">{{text}}</div>`
})

export class SgbBadgeComponent implements OnChanges {
  @Input() text = '';
  @Input() variant: VariantProps<typeof badgeVariants>['variant'] = 'default';

  protected defaultClass = badgeVariants({variant: this.variant})



  ngOnChanges(changes: SimpleChanges) {
    if(changes['variant']?.currentValue) {
      this.defaultClass = badgeVariants({variant: changes['variant'].currentValue})
    }
  }

}