import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Employee } from '../../Models/employee';

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  title :string;
  description :string;
  jobs :Array<string>;
  employee: Employee;
  employeeForm: FormGroup;

  constructor() {
    this.title = "Creación de un formulario reactivo";
    this.description = "Ejemplo de la creación de un formulario reactivo.";
    this.jobs = ['Project Manager', 'Programmer', 'Designer'];
    this.employee = new Employee();
  }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      // Form controls
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required,
                                  Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),
                                  this.forbiddenEmailValidator
                                 ]),
      age: new FormControl('', [Validators.pattern('[0-9]+')]),
      job: new FormControl(),
      isActive: new FormControl()
    });

    // Actualiza el modelo cuando se producen cambios en el formulario
    this.employeeForm.valueChanges.subscribe(value => {
      this.employee = value;
    });

  }

  // Validación personalizada para el email
  forbiddenEmailValidator(email: FormControl): {[s:string]: boolean} | null{
    let forbiddenEmails: Array<string> = ['dev1@gmail.com', 'dev2@gmail.com'];

    if (forbiddenEmails.indexOf(email.value) !== -1) {
      return {
        'invalid': true
      }
    }

    return null;
  }

  onSubmit(employeeForm) {
    // Imprime los datos recibidos en la consola
    console.log(this.employee);

    // Resetea el modelo y el formulario
    this.employee = new Employee();
    employeeForm.reset(this.employee);
  }

}
