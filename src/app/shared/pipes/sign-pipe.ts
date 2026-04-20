import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sign',
})
export class SignPipe implements PipeTransform {
  transform(value: number): string {
    return new Intl.NumberFormat('en-US', {
      signDisplay: 'always',
    }).format(value);
  }
}
