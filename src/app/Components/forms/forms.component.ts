import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Models/employee';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  title :string;
  description :string;
  jobs :Array<string>;
  employee: Employee;

  constructor() {
    this.title = "Creación de un formulario";
    this.description = "Ejemplo de la creación de un formulario.";
    this.jobs = ['Project Manager', 'Programmer', 'Designer'];
    this.employee = new Employee();
  }

  ngOnInit() {}

  onSubmit(employeeForm) {
    // Imprime los datos recibidos en la consola
    console.log(this.employee);

    // Resetea el modelo y el formulario
    this.employee = new Employee();
    employeeForm.form.reset();
  }

}
