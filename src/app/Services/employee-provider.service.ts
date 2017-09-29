import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Employee } from '../Models/employee';
import { LoggerService } from './logger.service';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

declare var $:any;

@Injectable()
export class EmployeeProviderService {

  private activeEmployee: Employee;
  private activeEmployeeId: string = null;
  private apiURL: string = 'https://curso-de-angular-61d7d.firebaseio.com/Empleados';
  
  private updateSubscription?: Subscription = null;
  
  constructor(private logger: LoggerService, private http: Http) {
    this.activeEmployee = new Employee();
  }
  
  // Crea un nuevo empleado
  createEmployee(): Observable<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(this.activeEmployee);
        
    return this.http.post(this.apiURL + '.json', body, options);
  }
  
  // Actualiza un empleado
  updateEmployee(): Subscription {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers });
    let body = JSON.stringify(this.activeEmployee);
                console.log(this.activeEmployee);
    return this.http.put(this.apiURL + '/' + this.activeEmployeeId + '.json', body, options)
      .subscribe( respuesta => {
        this.activeEmployee = respuesta.json() as Employee;
      });
  }  
  
  // Coge todos los empleados
  getEmployees(): Observable<any> {
    return this.http.get(this.apiURL + '.json');
  }    
  
  // Coge un empleado
  getEmployee(id: string): Observable<any> {
    this.activeEmployeeId = id;
    return this.http.get(this.apiURL + '/' + id + '.json')
      .map( respuesta => {
        this.activeEmployee = respuesta.json() as Employee;
        // return respuesta.json();
      } );
  }      
  
  // Elimina un empleado
  removeEmployee(id: string): Observable<any> {
    return this.http.delete(this.apiURL + '/' + id + '.json');
  }
    
  // Devuelve el formulario del employee
  formBuilder(isNew: boolean = false): FormGroup {
    
    // Si es nuevo
    if (isNew){
      this.activeEmployee = new Employee();
    }
    
    let employeeForm = new FormGroup({
      
      // Crea los elementos del formulario (form controls)
      name: new FormControl(this.activeEmployee.name, [Validators.required, Validators.minLength(4)]),
      email: new FormControl(this.activeEmployee.email, [Validators.required,
                                  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
                                  this.forbiddenEmailValidator
                                 ]),
      age: new FormControl(this.activeEmployee.age, [Validators.pattern('[0-9]+')]),
      job: new FormControl(this.activeEmployee.job),
      isActive: new FormControl(this.activeEmployee.isActive),
      valoration: new FormControl(this.activeEmployee.valoration)
    });
            
    // Actualiza el modelo cuando se producen cambios en el formulario
    employeeForm.valueChanges.subscribe(value => {

      // Esta funcionalidad solo se tiene en cuenta si estamos editando, no en el formulario de creación
      if (isNew) {
        return;
      }
      
      // Si los datos del formulario se han cambiado Y la validación es correcta
      if (employeeForm.dirty && employeeForm.valid){
        this.activeEmployee = value;
        
        // Si estamos editando al empleado, lo actualizamos conforme va actualizando sus datos
        if (this.activeEmployeeId !== null && this.activeEmployeeId !== undefined) {
          
          // Si la suscripción no está cerrada se elimina antes de enviar una nueva petición
          if (this.updateSubscription !== null && !this.updateSubscription.closed) {
            this.updateSubscription.unsubscribe();
          }
          
          this.updateSubscription = this.updateEmployee();
        }
      }
    });
    
    // Inicializa campo valoración
    let valorationSlider = $("#valoration").slider({
      ticks: [1, 2, 3, 4, 5],
      ticks_labels: ["Mal", "Regular", "Bien", "Muy bien", "Excelente"]
    });    
    
    // Valor inicial
    valorationSlider.slider('setValue', this.activeEmployee.valoration);
    employeeForm.controls['valoration'].setValue(this.activeEmployee.valoration);
    
    // Marca el campo como dirty (modificado)
    employeeForm.controls['valoration'].markAsDirty();      
        
    // Actualiza valor al mover el slider (evento change del slider)
    valorationSlider.change(event => {
      employeeForm.controls['valoration'].setValue(event.value.newValue);
      
      // Marca el campo como dirty (modificado)
      employeeForm.controls['valoration'].markAsDirty();      
    });
    
    return employeeForm;
  } 
   
  // Validación personalizada para el email
  forbiddenEmailValidator(email: FormControl): {[s:string]: boolean} | null{
    
    // Emails prohibidos
    let forbiddenEmails: Array<string> = ['dev1@gmail.com', 'dev2@gmail.com'];

    // Si se ha introducido un email prohibido
    if (forbiddenEmails.indexOf(email.value) !== -1) {
      return {
        'invalid': true
      }
    }

    // En caso contrario
    return null;
  }
}
