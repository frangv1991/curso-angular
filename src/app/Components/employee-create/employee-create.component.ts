import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Employee } from '../../Models/employee';
import { EmployeeProviderService } from '../../Services/employee-provider.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  jobs :Array<string>;
  employeeForm: FormGroup;

  constructor(
    private employeeProvider: EmployeeProviderService,
    private router: Router
  ) {
    this.jobs = ['Project Manager', 'Programmer', 'Designer'];
  }

  ngOnInit() {
    // Obtenemos el formulario que vamos a usar
    this.employeeForm = this.employeeProvider.formBuilder(true);
  }

  onSubmit(employeeForm) {
    this.employeeProvider.createEmployee().subscribe(
      
      // Callback de éxito
      response => {
        
        // Navega hacia la ruta de edición
        this.router.navigate(['/edit-employee', response.json().name]); // json() convierte la respuesta en un objeto json      
      },
      
      // Callback de error
      error => console.log('Se ha producido un error: ' + error),
      
      // Callback de finalización (se ejecuta después de los callbacks de éxito o error)
      () => console.log('createEmployee() finalizado')
    );      
  }
}
