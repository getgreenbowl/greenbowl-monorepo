import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'classRender',
})
export class classRenderPipe implements PipeTransform {
  transform(value: unknown, item?: unknown[], btn?: any): any {
    // if user choose to show btn and permission is also true
    if (btn && btn.class && typeof value != 'function') {
      return btn.class;
    } else if (typeof value == 'function') {
      // value is not a boolean refrence
      return value(item);
    } else {
      return '';
    }
  }
}
