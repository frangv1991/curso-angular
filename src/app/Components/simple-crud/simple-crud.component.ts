import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Http, Headers, RequestOptions } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { UserProviderService } from '../../Services/userprovider.service';
import { Employee } from '../../Models/employee';

const API_END_POINT: string = "https://curso-de-angular-72a40.firebaseio.com/Employee";

@Component({
  selector: 'app-simple-crud',
  templateUrl: './simple-crud.component.html',
  styleUrls: ['./simple-crud.component.css']
})
export class SimpleCrudComponent implements OnInit {
  
  title :string;
  description :string;
  jobs :Array<string>;
  employee: Employee;
  employeeForm: FormGroup;
  users: Array<any>;
  updateSubscription?: Subscription = null;
  
  constructor(private userProvider: UserProviderService, private http: Http) {
    this.jobs = ['Project Manager', 'Programmer', 'Designer'];
    this.employee = new Employee();
  }

  ngOnInit() {
    // Instancia un nuevo formulario
    this.employeeForm = new FormGroup({

      // Crea los elementos del formulario (form controls)
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required,
                                  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
                                 ]),
      age: new FormControl(),
      job: new FormControl(),
      valoration: new FormControl(),
      isActive: new FormControl(),
      id: new FormControl()
    });

    this.employeeForm.valueChanges.subscribe(value => {

      // Si los datos del formulario son válidos
      if (this.employeeForm.valid){
        this.userProvider.updateUser(value);
        
        // Si estamos editando y se ha modificado
        if (this.employee.id != null && this.employeeForm.dirty) {
          this.updateUser();
        }
      }
    });
    
    // Lista usuarios
    this.users = [];
    this.loadAllUsers();
  }
  
  // Coge todos los usuarios
  loadAllUsers(): void {
    
    // Nos suscribimos a la respuesta del método get
    this.http.get(API_END_POINT + '.json').subscribe(
      
      // Callback de ÉXITO
      response => {      
        let data = response.json(); // Transformamos la respuesta en json
        
        // Reseteamos el array de usuarios
        this.users = [];
        
        // Recorremos el objeto devuelto para darle el formato adecuado
        for(let key in data){
          this.users.push(new Employee(
            data[key].name,
            data[key].email,
            data[key].job,
            data[key].age,
            data[key].isActive,
            data[key].valoration,
            key
          ));
        }
      },
      
      // Callback de error
      error => console.log('Se ha producido un error en loadAllUsers(): ' + error),
      
      // Callback de finalización (se ejecuta después de los callbacks de éxito o error)
      () => console.log('loadAllUsers() finalizado')
      
    );    
  }  
  
  // Crea un usuario
  createUser(): void {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(this.userProvider.sessionUser());
        
    this.http.post(API_END_POINT + '.json', body, options).subscribe(
      
      // Callback de éxito
      response => {
        // Carga el listado de usuarios
        this.loadAllUsers();
        
        // Resetea el modelo y el formulario
        this.employee = new Employee();
        this.employeeForm.reset();        
      },
      
      // Callback de error
      error => console.log('Se ha producido un error: ' + error),
      
      // Callback de finalización (se ejecuta después de los callbacks de éxito o error)
      () => console.log('createEmployee() finalizado')
    );
  }
  
  // Carga usuario en el formulario para ser editado
  loadUser(user): void {
    this.employee = user;
    if (!user.isActive) {
      user.isActive = false;
    }
    this.employeeForm.setValue(user);
  }
  
  // Actualiza un usario
  updateUser(): void {
    // Si hay una suscripción previa y no está cerrada, la cancelamos antes de volver a suscribirnos
    if (this.updateSubscription !== null && !this.updateSubscription.closed) {
      this.updateSubscription.unsubscribe();
    }    
    
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(this.userProvider.sessionUser());
        
    this.updateSubscription = this.http.put(API_END_POINT + '/' + this.employee.id + '.json', body, options).subscribe(
        response => {
          this.employee = response.json();
          this.loadAllUsers();
        }
    );    
  }
  
  // Elimina un usuario
  removeUser(user): void {
    this.http.delete(API_END_POINT + '/' + user.id + '.json').subscribe(
      
      // Callback de éxito
      response => {
        this.loadAllUsers();
        console.log("El usuario con ID " + user.id + " se borró correctamente.")
      },
      
      // Callback de error
      error => console.log("El usuario no se borró: " + error)      
    );  
  }
}
