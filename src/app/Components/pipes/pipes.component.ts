import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pipes',
  templateUrl: './pipes.component.html',
  styleUrls: ['./pipes.component.css'],
  providers: [DatePipe]
})
export class PipesComponent implements OnInit {

  title1 :string = "Filtro de fecha";
  description1 :string = "Ejemplo con filtro de fecha.";
  birthdate: Date = new Date(1995, 3, 20); // Abril 20, 1995

  title2 :string = "Filtro de transformación de caracteres";
  description2 :string = "Ejemplos con filtros de cadena.";
  dummyText: string = "Lorem Ipsum dolor sit amet. Consectetur Adipiscing elit.";

  title3 :string = "Filtros personalizados";
  description3 :string = "Ejemplo de un filtro personalizado: stripHtml.";
  htmlText: string = "Texto <strong>con etiquetas</strong> <u>HTML</u>";

  constructor(private datePipe: DatePipe) { }

  ngOnInit() {
    // Ejemplo de aplicación de un filtro en una clase
    // Es necesario importar el filtro (para el ejemplo DatePipe) y agregar
    // el argumento correspondiente en el constructor para que se le inyecte
    // cuando se instancie la clase.
    // También es necesario indicar el servicio en el metadato 'providers' del
    // decorador (del módulo o del componente)
    console.log(this.datePipe.transform(this.birthdate, 'dd-MM-yyyy'));
  }

}
