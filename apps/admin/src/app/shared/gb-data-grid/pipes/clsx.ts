import { Pipe, PipeTransform } from '@angular/core';
import clsx, { ClassValue } from 'clsx';

@Pipe({
  name: 'clsx',
})
export class ClsxPipe implements PipeTransform {
  transform(value: ClassValue): string {
    return clsx(value);
  }
}
