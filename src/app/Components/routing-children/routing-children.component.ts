import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { RoutingComponent } from '../routing/routing.component';

@Component({
  selector: 'app-routing-children',
  templateUrl: './routing-children.component.html',
  styleUrls: ['./routing-children.component.css']
})
export class RoutingChildrenComponent implements OnInit, OnDestroy {

  employees: Array<any>;
  activeEmployee: any;
  params: any;

  constructor(private router:Router, private activedRoute:ActivatedRoute, private routingComponent:RoutingComponent) {
    this.employees = routingComponent.employees;
  }

  ngOnInit() {
    console.log("Accedo a onInit hijo");
    this.params = this.activedRoute.parent.params.subscribe(params => {
      console.log("Accedo al suscriptor hijo");

      // Find employee
      this.activeEmployee = this.employees.find(x => x.id === +params['id']);  // (+) convierte la cadena en número
    });
  }

  ngOnDestroy() {
    this.params.unsubscribe();
  }

}
