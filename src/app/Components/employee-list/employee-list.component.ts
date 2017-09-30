import { Component, OnInit } from '@angular/core';

import { Employee } from '../../Models/employee';
import { EmployeeProviderService } from '../../Services/employee-provider.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Array<Employee>;
    
  constructor(public employeeProvider: EmployeeProviderService) { }

  ngOnInit() {
    this.loadEmployees();
  }
  
  // Carga todos los empleados
  loadEmployees() {
    this.employeeProvider.getEmployees().subscribe(response => {
      
      let data = response.json();
      
      // Inicializamos el array de empleados
      this.employees = [];
      
      // Recorremos el objeto devuelto para darle el formato adecuado
      for(let key in data){
        this.employees.push(new Employee(
          data[key].name,
          data[key].email,
          data[key].job,
          data[key].age,
          data[key].isActive,
          data[key].valoration,
          key
        ));
      }
    });       
  }
  
  // Borra empleado
  removeEmployee(id: string) {
    this.employeeProvider.removeEmployee(id).subscribe(response => {
      
      // Recarga el listado de empleados
      this.loadEmployees();
    });       
  }  

}
