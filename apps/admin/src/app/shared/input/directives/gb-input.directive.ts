import {
  AfterViewInit,
  Directive,
  ElementRef,
  Renderer2,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[gbinput]',
})
export class GbInputDirective implements AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngAfterViewInit(): void {
    const input = this.el.nativeElement.querySelector('input');
    const textarea = this.el.nativeElement.querySelector('textarea');

    if (input) {
      this.renderer.addClass(input, 'form-control');
      this.renderer.addClass(input, 'form-control-sm');
    }

    if (textarea) {
      this.renderer.setAttribute(
        textarea,
        'class',
        'form-control form-control-sm'
      );
    }
  }
}
