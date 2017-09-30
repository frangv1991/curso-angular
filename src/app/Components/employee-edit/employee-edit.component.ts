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
    // Obtenemos el formulario que vamos a usar
    this.employeeForm = this.employeeProvider.formBuilder();
    
    // Obtenemos el parámetro "id" de la ruta
    this.activedRoute.params.subscribe(params => {
      this.loadUser(params['id']);
    });        
  }

  // Cargamos al usuario que vamos a editar
  loadUser(id: any){
    
    this.employeeProvider.getEmployee(id).subscribe(
      
      // Callback de éxito
      response =>{
        this.employeeForm = this.employeeProvider.formBuilder();
      },
      
      // Callback de error
      error => {
        console.log('Se ha producido un error: ' + error);
        this.router.navigate(['/404']);         
      }, 
      
      // Callback de finalización (se ejecuta después de los callbacks de éxito o error)
      () => console.log('getEmployee() finalizado')      
    );      
  }
 
}
