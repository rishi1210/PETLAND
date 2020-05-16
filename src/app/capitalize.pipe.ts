import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if(args == undefined)
    return "Mr. " + value;
  else 
    return "Mrs. " + value;
  }
}
