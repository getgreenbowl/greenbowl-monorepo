import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'render',
})
export class RenderPipe implements PipeTransform {

  transform(value: unknown, item?: unknown[], btn?: any): any {
    // if user choose to show btn and permission is also true
    if (btn && btn.show && typeof value != 'function') {
      return true
    } else if (typeof value == 'function') {
      // value is not a boolean refrence
      return value(item);
    }
    return value;
  }
}
