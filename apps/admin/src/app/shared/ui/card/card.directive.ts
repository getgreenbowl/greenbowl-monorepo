import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';
import { mergetw } from '../../utils/tw-merge';

@Directive({
  selector: '[sgb-card]',
})
export class SgbCardDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    const defaultClass =
      'rounded-lg border bg-card text-card-foreground shadow-sm';

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'class',
      defaultClass
    );
  }
}

@Directive({
  selector: '[sgb-card-title]',
})
export class SgbCardTitleDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    const defaultClass = 'text-lg font-semibold leading-none tracking-tight';

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'class',
      defaultClass
    );
  }
}

@Directive({
  selector: '[sgb-card-header]',
})
export class SgbCardHeaderDirective implements OnInit {
  @Input() class = '';
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    const defaultClass = mergetw('flex flex-col space-y-1.5 p-6', this.class);

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'class',
      defaultClass
    );
  }
}

@Directive({
  selector: '[sgb-card-footer]',
})
export class SgbCardFooterDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    const defaultClass = 'flex items-center p-6 pt-0';

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'class',
      defaultClass
    );
  }
}

@Directive({
  selector: '[sgb-card-content]',
})
export class SgbCardContentDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    const defaultClass = 'p-6 pt-0';

    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'class',
      defaultClass
    );
  }
}
