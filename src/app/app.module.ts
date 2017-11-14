import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_ROUTING } from './app.routing';

import { LoggerService } from './Services/logger.service';
import { UserProviderService } from './Services/userprovider.service';
import { EmployeeProviderService } from './Services/employee-provider.service';

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
import { RoutingChildrenComponent } from './Components/routing-children/routing-children.component';
import { ChildComponent } from './Components/child/child.component';
import { EmployeeCreateComponent } from './Components/employee-create/employee-create.component';
import { EmployeeEditComponent } from './Components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { TruncateStringPipe } from './Pipes/truncate-string.pipe';

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
    PageNotFoundComponent,
    RoutingChildrenComponent,
    ChildComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeeListComponent,
    TruncateStringPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTING,
    HttpModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-ES" }, // Con la key deps podemos indicar el servicio que se encargará proporcionar el locale (InjectionToken)
    LoggerService,
    UserProviderService,
    EmployeeProviderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
