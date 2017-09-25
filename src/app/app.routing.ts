import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Importamos componentes
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { DataBindingComponent } from './Components/data-binding/data-binding.component';
import { DirectivesComponent } from './Components/directives/directives.component';
import { PipesComponent } from './Components/pipes/pipes.component';
import { FormsComponent } from './Components/forms/forms.component';
import { ReactiveFormsComponent } from './Components/reactive-forms/reactive-forms.component';
import { RoutingComponent } from './Components/routing/routing.component';

export const appRoutes: Routes = [
  {path: 'data-binding', component: DataBindingComponent },
  {path: 'directives', component: DirectivesComponent },
  {path: 'pipes', component: PipesComponent },
  {path: 'forms', component: FormsComponent },
  {path: 'reactive-forms', component: ReactiveFormsComponent },
  {path: 'routing/:id', component: RoutingComponent},
  {path: '', pathMatch: 'full', redirectTo: 'data-binding' }, // página principal
  {path: '**', component: PageNotFoundComponent }, // página no encontrada
];

export const appRoutingProviders: Array<any> = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);