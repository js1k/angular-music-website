import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'towan'
})
export class TowanPipe implements PipeTransform {

  transform(value: number, args?: any): any {
  
    if(value - 10000 < 0){
      return value;
    }
    return parseInt(""+value/10000)+"万"
  }

}