import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-routing',
  templateUrl: './routing.component.html',
  styleUrls: ['./routing.component.css']
})
export class RoutingComponent implements OnInit, OnDestroy {

  employees: Array<any>;
  activeEmployee: number;
  params: any;

  constructor(private router:Router, private activedRoute:ActivatedRoute) {
    this.employees = [
      {
        name: "Sergio Rodríguez",
        email: "serrod@gmail.com"
      },
      {
        name: "Ángela Pérez",
        email: "angper@gmail.com"
      },
      {
        name: "Rafael Fernández",
        email: "raffer@gmail.com"
      }
    ];
  }

  ngOnInit() {
    this.params = this.activedRoute.params.subscribe(params => {
      this.activeEmployee = +params['id'] // (+) convierte la cadena en número
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
