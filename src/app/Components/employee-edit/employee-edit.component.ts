import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { EmployeeProviderService } from '../../Services/employee-provider.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {

  jobs :Array<string>;
  employeeForm: FormGroup;

  constructor(
    public employeeProvider: EmployeeProviderService,
    private router: Router,
    private activedRoute: ActivatedRoute
  ) {
    this.jobs = ['Project Manager', 'Programmer', 'Designer'];
  }

  ngOnInit() {
    this.employeeForm = this.employeeProvider.formBuilder();
    
    // Obtiene el id de los parámetros
    this.activedRoute.params.subscribe(params => {
      this.loadUser(params['id']);
    });        
  }

  // Carga al usuario
  loadUser(id){
    this.employeeProvider.getEmployee(id).subscribe(
      // Exito
      response =>{
        this.employeeForm = this.employeeProvider.formBuilder();
      },
      
      // Error
      error =>{
        console.log('Se ha producido un error: ' + error);
        this.router.navigate(['/404']);         
      }
    );      
  }
}
