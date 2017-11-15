import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Employee } from '../Models/employee';
import { LoggerService } from './logger.service';

import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// Declaramos el objecto $ (jQuery) para poder usarlo dentro de nuestro código en Angular
declare var $: any;

@Injectable()
export class EmployeeProviderService {

  // Usuario que estamos editando o creando
  // Será una nueva instancia de Employee si estamos creando un nuevo usuario
  private activeEmployee: Employee;
  
  // Id del usuario que estamos editando
  private activeEmployeeId: string = null;
  
  // Endpoint de la API
  private apiURL: string = 'https://curso-de-angular-61d7d.firebaseio.com/Empleados';
  
  private updateSubscription?: Subscription = null;
  
  constructor(private logger: LoggerService, private http: Http) {
    this.activeEmployee = new Employee();
  }
  
  // Crea un nuevo empleado
  createEmployee(): Observable<any> {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(this.activeEmployee);
        
    return this.http.post(this.apiURL + '.json', body, options);
  }
  
  // Actualiza un empleado
  // Devuelve un Subscription para poder cancelarlo cuando sea necesario
  updateEmployee(): Subscription {
    const headers = new Headers({'Content-Type': 'application/json'});
    const options = new RequestOptions({ headers: headers });
    const body = JSON.stringify(this.activeEmployee);
    
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
    
    // Seteamos el activeEmployeeId en el servicio
    this.activeEmployeeId = id;
    
    return this.http.get(this.apiURL + '/' + id + '.json')
      // Map crea un nuevo Observable partiendo de los datos que recibe del Observable devuelto por get().
      // Esto nos permite transformar o pre-procesar los datos devueltos por el método get().
      // En este caso lo usamos para setear el activeEmployee en el servicio.
      .map( respuesta => {
        this.activeEmployee = respuesta.json() as Employee; // Con "as Employee" estamos declarando la respuesta como tipo Employee
      });
  }      
  
  // Elimina un empleado
  removeEmployee(id: string): Observable<any> {
    return this.http.delete(this.apiURL + '/' + id + '.json');
  }
    
  // Devuelve el formulario del employee
  formBuilder(isNew: boolean = false): FormGroup {
    
    // Si estamos creando un nuevo empleado, el activeEmployee es una nueva instancia del modelo
    if (isNew) {
      this.activeEmployee = new Employee();
    }
    
    // Creamos el formulario (FormGroup)
    const employeeForm = new FormGroup({
      
      // Creamos los elementos del formulario (FormControl) con sus valores iniciales y sus validaciones correspondientes
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

      // Si los datos del formulario se han cambiado Y la validación es correcta
      if (employeeForm.dirty && employeeForm.valid) {
        this.activeEmployee = value;
        
        // Si estamos editando al empleado, lo vamos actualizando en la BD conforme actualizamos sus datos en el formulario
        if (!isNew && this.activeEmployeeId !== null && this.activeEmployeeId !== undefined) {
          
          // Si hay una suscripción previa y no está cerrada, la cancelamos antes de volver a suscribirnos
          if (this.updateSubscription !== null && !this.updateSubscription.closed) {
            this.updateSubscription.unsubscribe();
          }
          
          // Generamos una nueva suscripción
          this.updateSubscription = this.updateEmployee();
        }
      }
    });
    
    // Inicializa el campo valoration
    // Es un ejemplo de integración con un componente realizado con jQuery (bootstrap-slider).
    // Es necesario haber declarado previamente el objeto $ (jQuery) como tipo any (declare var $:any;)
    const valorationSlider = $('#valoration').slider({
      ticks: [1, 2, 3, 4, 5],
      ticks_labels: ['Mal', 'Regular', 'Bien', 'Muy bien', 'Excelente']
    });    
    
    // Valor inicial
    valorationSlider.slider('setValue', this.activeEmployee.valoration); // en el componente jQuery
    employeeForm.controls['valoration'].setValue(this.activeEmployee.valoration); // en el FormControl
    
    // Marca el campo como dirty (modificado)
    employeeForm.controls['valoration'].markAsDirty();      
        
    // Evento 'change' del componente jQuery (cuando movemos el slider)
    valorationSlider.change(event => {
      
      // Actualizamos el valor del FormControl al mover el slider
      employeeForm.controls['valoration'].setValue(event.value.newValue);
      
      // Marcamos el FormControl como dirty (modificado)
      employeeForm.controls['valoration'].markAsDirty();      
    });
    
    // Devolvemos el FormGroup
    return employeeForm;
  } 
   
  // Validación personalizada para el campo email
  forbiddenEmailValidator(email: FormControl): {[s: string]: boolean} | null {
    
    // Emails prohibidos
    const forbiddenEmails: Array<string> = ['dev1@gmail.com', 'dev2@gmail.com'];

    // Si se ha introducido un email prohibido devolvemos el objeto {invalid: true}
    if (forbiddenEmails.indexOf(email.value) !== -1) {
      return {
        'invalid': true
      };
    }

    // Si la validación es correcta devolvemos null
    return null;
  }
}
