import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stripHtml'
})
export class StripHtmlPipe implements PipeTransform {

  transform(value?: string, args?: any): string {
    if (!value) {
      return '';
    }

    // Elimina las etiquetas que encuentre en la cadena, para ello utiliza
    // la expresión regular /<(?:.|\n)*?>/gm
    return value.replace(/<(?:.|\n)*?>/gm, '');
  }

}
