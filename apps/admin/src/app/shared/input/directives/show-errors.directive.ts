import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[showError]',
  standalone: true
})
export class ShowErrorDirective implements OnChanges {
  @Input() showError = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  inputWrapper = this.el.nativeElement as HTMLDivElement;

  ngOnChanges(changes: SimpleChanges): void {
    const value = changes['showError']?.currentValue
    if (value !== undefined) {
     const element = this.getElement();
     if(element) {
      this.handleErrorClass(element, value)
     }
    }
  }

  private getElement(): HTMLInputElement | HTMLTextAreaElement | null {
    const input = this.inputWrapper.querySelector('input');
    if(input) {
      return input
    }
    const textarea = this.inputWrapper.querySelector('textarea');
    return textarea
  }

  private handleErrorClass(element: HTMLInputElement | HTMLTextAreaElement, value: boolean) {
    if (
      value
    ) {
      this.renderer.addClass(element, 'is-invalid');
    } else if(element.classList.contains('is-invalid')) {
      this.renderer.removeClass(element, 'is-invalid');
    }
  }

}
