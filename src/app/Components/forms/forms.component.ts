import { Component, OnInit } from '@angular/core';
import { Employee } from '../../Models/employee';

import { UserProviderService } from '../../Services/userprovider.service';

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

  constructor(private userProvider: UserProviderService) {
    this.title = "Creación de un formulario";
    this.description = "Ejemplo de la creación de un formulario.";
    this.jobs = ['Project Manager', 'Programmer', 'Designer'];
    this.employee = new Employee();
  }

  ngOnInit() {
  
    // Devuelve al usuario de sesión
    //this.employee = this.userProvider.sessionUser();
  
  }

  onSubmit(employeeForm) {
    // Imprime los datos recibidos en la consola
    console.log(this.employee);

    // Actualiza los datos del usuario
    this.userProvider.updateUser(this.employee);
    
    // Resetea el modelo y el formulario
    //this.employee = new Employee();
    //employeeForm.form.reset();
  }

}
