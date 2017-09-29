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
    this.employeeForm = this.employeeProvider.formBuilder(true);
  }

  onSubmit(employeeForm) {
    this.employeeProvider.createEmployee().subscribe(
      // Exito
      response =>{
        console.log(response);
        
        // Navega hacia la ruta de edición
        this.router.navigate(['/edit-employee', response.json().name]);        
      },
      
      // Error
      error => console.log('Se ha producido un error: ' + error)
    );      
  }
}
