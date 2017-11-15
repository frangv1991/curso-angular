import { Routes, RouterModule } from '@angular/router';

// Importamos componentes
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { DataBindingComponent } from './Components/data-binding/data-binding.component';
import { DirectivesComponent } from './Components/directives/directives.component';
import { PipesComponent } from './Components/pipes/pipes.component';
import { FormsComponent } from './Components/forms/forms.component';
import { ReactiveFormsComponent } from './Components/reactive-forms/reactive-forms.component';
import { RoutingComponent } from './Components/routing/routing.component';
import { RoutingChildrenComponent } from './Components/routing-children/routing-children.component';
import { EmployeeCreateComponent } from './Components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './Components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { SimpleCrudComponent } from './Components/simple-crud/simple-crud.component';

export const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/variables' }, // página principal
  {path: 'variables', component: DataBindingComponent },
  {path: 'directives', component: DirectivesComponent },
  {path: 'pipes', component: PipesComponent },
  {path: 'forms', component: FormsComponent },
  {path: 'reactive-forms', component: ReactiveFormsComponent },
  {path: 'routing', component: RoutingComponent},
  {path: 'routing/:id', component: RoutingComponent, children: [{
      path: 'editar', component: RoutingChildrenComponent
  }]},
  {path: 'simple-crud', component: SimpleCrudComponent },
    
  // Gestión de empleados
  {path: 'new-employee', component: EmployeeCreateComponent},  
  {path: 'edit-employee/:id', component: EmployeeEditComponent},    
  {path: 'list-employee', component: EmployeeListComponent},      
  
  {path: '**', component: PageNotFoundComponent }, // página no encontrada
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
