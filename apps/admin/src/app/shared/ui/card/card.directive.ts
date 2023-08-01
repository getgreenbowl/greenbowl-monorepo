import {
  Directive,
  ElementRef,
  Renderer2,
  Input,
  inject,
  OnInit,
} from '@angular/core';
import { mergetw } from '../../utils/tw-merge';

@Directive()
class BaseCardClass {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  @Input() class = '';

  protected initClass(baseClass: string) {
    this.renderer.setAttribute(
      this.elementRef.nativeElement,
      'class',
      mergetw(baseClass, this.class)
    );
  }
}

@Directive({
  selector: '[sgb-card]',
})
export class SgbCardDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass('rounded-lg border bg-card text-card-foreground shadow-sm');
  }
}

@Directive({
  selector: '[sgb-card-title]',
})
export class SgbCardTitleDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass('text-sm font-semibold leading-none tracking-tight');
  }
}

@Directive({
  selector: '[sgb-card-header]',
})
export class SgbCardHeaderDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass('flex flex-col space-y-1.5 p-6');
  }
}

@Directive({
  selector: '[sgb-card-footer]',
})
export class SgbCardFooterDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass('flex items-center p-6 pt-0');
  }
}

@Directive({
  selector: '[sgb-card-content]',
})
export class SgbCardContentDirective extends BaseCardClass implements OnInit {
  ngOnInit(): void {
    this.initClass('p-6 pt-0');
  }
}
