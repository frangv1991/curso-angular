import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appAlertMessage]'
})
export class AlertMessageDirective {

  @Input('appAlertMessage') message?: Object;

  constructor(private el: ElementRef) {}

  ngOnInit(){
    if (this.message === null || this.message === undefined || !this.message['type']) {
      return;
    }

    let classes: string = "alert";

    switch(this.message['type']) {
      case 'success':
        classes += " alert-success";
        break;
      case 'error':
        classes += " alert-danger";
        break;
    }

    // Agrega el atributo class con las clases correspondientes en el elemento que
    // contiene la directiva
    this.el.nativeElement.setAttribute('class', classes);

    // Agrega el texto dentro del elemento que contiene la directiva
    this.el.nativeElement.innerHTML = this.message['message'];
  }
}
