import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { TooltipComponent } from './tooltip/tooltip.component';

@Directive({
  selector: '[sgbTooltip]',
})
export class TooltipDirective implements OnDestroy {
  /**
   * tooltip text that is be shown in tooltip component.
   * read property name same as selector to make it use in single property name
   */
  @Input() sgbTooltip  = '';
  /**
   * to place the tooltip
   * right now we have added only 2 option bottom and top
   * we can add right and left
   */
  @Input()
  placement: 'top' | 'bottom' = 'top';
  /**
   * to define the max width of the element in px
   * default value is set to 200 but we will pass the value from directive as
   * 2 * host width if not passed explicitely
   */
  @Input()
  maxWidth!: number;
  /**
   * to define the min width of the element in px
   */
  @Input()
  minWidth = 100;

  offset = 10;

  private componentRef: ComponentRef<any> | undefined;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.componentRef === undefined && this.sgbTooltip) {
      /**
       * create the componentFactory
       */
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        TooltipComponent
      );
      /**
       * create new component through component factory.
       */
      this.componentRef = componentFactory.create(this.injector);
      /**
       * add new component to applicationRef to enable the change detection in the component.
       */
      this.appRef.attachView(this.componentRef.hostView);
      /**
       * convert the component to domElement to add it to the DOM
       */
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;
      /**
       * append new dom Element to the document body
       */
      document.body.appendChild(domElem);
      this.setTooltipComponentProperties();
    }
  }

  /**
   * sets the position of the tooltip element
   */
  private setTooltipComponentProperties() {
    if (this.componentRef !== undefined) {
      this.componentRef.instance.class = `tooltip-${this.placement}`;
      this.componentRef.instance.sgbTooltip = this.sgbTooltip;
      /**
       * get the host element position coordinates
       */
      const hostPosition = this.elementRef.nativeElement.getBoundingClientRect();
      this.componentRef.instance.maxWidth =
        this.maxWidth || 2.5 * hostPosition.width;
      /**
       * assign the minWidth value to component property
       */
      this.componentRef.instance.minWidth = this.minWidth;
      /**
       * get the tooltip div elemnt position coordinates
       */
      const tooltipElement = document.body.getElementsByClassName('tooltip')[0];

      /** for this logic we need to test it properly considering other use cases as well. */
      if (this.placement === 'top') {
        this.renderer.setStyle(
          tooltipElement,
          'bottom',
          `${window.innerHeight - hostPosition.top + this.offset}px`
        );
        this.renderer.setStyle(
          tooltipElement,
          'left',
          `${hostPosition.left + hostPosition.width / 2}px`
        );
        // left = hostPosition.left + hostPosition.width / 2;
      } else if (this.placement === 'bottom') {
        this.renderer.setStyle(
          tooltipElement,
          'top',
          `${hostPosition.bottom}px`
        );
        this.renderer.setStyle(
          tooltipElement,
          'left',
          `${hostPosition.left + hostPosition.width / 2}px`
        );
      }
    }
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.destroy();
  }

  /**
   * destroy when directive instance gets destroyed
   * because if we don't do this then it will be there until we refresh the page.
   */
  ngOnDestroy(): void {
    this.destroy();
  }

  /**
   * detaches the component view from appRef.
   * removes the component from DOM and sets componetRef to null
   */
  destroy(): void {
    if (this.componentRef !== undefined) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
  }
}
