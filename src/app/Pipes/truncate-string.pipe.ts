import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString'
})
export class TruncateStringPipe implements PipeTransform {

  transform(value: string, args?: any): string {
    console.log(args);
    if (!value) {
      return '';
    }    
    
    if (value.length <= args.maxLength) {
      return value;
    }
    
    let newValue: string = value.substring(0, args.maxLength);
    if (args.ellipsis) {
      newValue += ' ...';
    }
    
    return newValue;
  }

}
