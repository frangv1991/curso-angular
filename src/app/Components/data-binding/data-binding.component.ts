import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  title1 :string = "Interpolación";
  description1 :string = "Ejemplo de data-binding por interpolación.";

  title2 :string = "Property binding";
  description2: string = "Ejemplo de property binding.";
  user1: any = {
    name: "Ricardo Fernández",
    email: "ricfer@gmail.com"
  };

  title3 :string = "Event binding";
  description3: string = "Ejemplo de event binding.";
  counter: number = 0;
  sumAction():void {
    this.counter++;
  }

  title4 :string = "Two-way binding";
  description4: string = "Ejemplo de two-way binding (bi-direccional).";
  content: string = "Escribe aquí ...";

  parentVariable: string = "Soy parentVariable";
  childComponentVar: string;
  
  constructor() { }

  ngOnInit() {
  }

  getChildVar(event) {
    this.childComponentVar = event;
  }
   
  
}
