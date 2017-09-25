import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutingProviders, routing } from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { BodyComponent } from './Components/body/body.component';
import { FooterComponent } from './Components/footer/footer.component';
import { DataBindingComponent } from './Components/data-binding/data-binding.component';
import { DirectivesComponent } from './Components/directives/directives.component';
import { PipesComponent } from './Components/pipes/pipes.component';
import { StripHtmlPipe } from './Pipes/strip-html.pipe';
import { AlertMessageDirective } from './Directives/alert-message.directive';
import { FormsComponent } from './Components/forms/forms.component';
import { ReactiveFormsComponent } from './Components/reactive-forms/reactive-forms.component';
import { RoutingComponent } from './Components/routing/routing.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    DataBindingComponent,
    DirectivesComponent,
    PipesComponent,
    StripHtmlPipe,
    AlertMessageDirective,
    FormsComponent,
    ReactiveFormsComponent,
    RoutingComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-ES" }, // Con la key deps podemos indicar el servicio que se encargará proporcionar el locale (InjectionToken)
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
