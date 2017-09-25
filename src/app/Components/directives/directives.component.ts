import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directives',
  templateUrl: './directives.component.html',
  styleUrls: ['./directives.component.css']
})
export class DirectivesComponent implements OnInit {

  title1 :string = "Directivas estructurales: ngIf";
  description1 :string = "Ejemplo de la directiva ngIf.";
  activeColor: string;
  changeColor(color: string): void {
    this.activeColor = color;
  }

  title2 :string = "Directivas estructurales: ngFor";
  description2 :string = "Ejemplo de la directiva ngFor.";
  colorsList: Array<string> = ['Azul', 'Verde', 'Amarillo', 'Rojo', 'Naranja'];

  title3 :string = "Directivas de atributo: ngClass";
  description3 :string = "Ejemplo de la directiva ngClass.";
  alertStatus: string;
  changeAlertStatus(status: string): void {
    this.alertStatus = status;
  }

  title4 :string = "Directivas de atributo: ngStyle";
  description4 :string = "Ejemplo de la directiva ngStyle.";
  alertStatus2: string;
  changeAlertStatus2(status: string): void {
    this.alertStatus2 = status;
  }
  printInlineStyles(): Object {
    let foregroundColor: string = "#000";
    let backgroundColor: string = "#fff";

    switch(this.alertStatus2) {
      case 'success':
        foregroundColor = "#fff";
        backgroundColor = "green";
        break;
      case 'error':
        foregroundColor = "#fff";
        backgroundColor = "red";
        break;
    }

    return {'background-color': backgroundColor, 'color': foregroundColor};
  }

  title5 :string = "Directivas personalizadas";
  description5 :string = "Ejemplo de una directiva personalizada: [appAlertMessage].";
  alertStatus5: string;
  color: string = 'red';
  getAlertMessage(): Object {
    return {
      'type': 'success',
      'message': 'El resultado fue OK'
    };
  }

  constructor() { }

  ngOnInit() {
  }

}
