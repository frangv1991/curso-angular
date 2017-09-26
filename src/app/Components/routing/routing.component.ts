import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit, OnDestroy {

  title: string;
  description: string;
  employees: Array<any>;
  activeEmployee: any;
  params: any;

  constructor(private router:Router, private activedRoute:ActivatedRoute) {
    this.title = "Navegación con parámetros";
    this.description = "Ejemplo de rutas con parámetros.";
    this.employees = [
      {
        id: 1,
        name: "Sergio Rodríguez",
        email: "serrod@gmail.com"
      },
      {
        id: 2,
        name: "Ángela Pérez",
        email: "angper@gmail.com"
      },
      {
        id: 3,
        name: "Rafael Fernández",
        email: "raffer@gmail.com"
      }
    ];
  }

  ngOnInit() {
    console.log("Accedo a onInit");
    this.params = this.activedRoute.params.subscribe(params => {
      console.log("Accedo al suscriptor");

      // Find employee
      this.activeEmployee = this.employees.find(x => x.id === +params['id']);  // (+) convierte la cadena en número
    });
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

  showEmployee(id: number) {
    // Navega hacia una ruta
    this.router.navigate(['routing', id]);
  }

}
