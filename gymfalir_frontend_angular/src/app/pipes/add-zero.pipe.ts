import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addZero',
  standalone: true
})
export class AddZeroPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    if (value != null && value < 10) {
      return '0'+value
    }
    return value.toString()
  }
 
}
