

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {FormsModule} from "@angular/forms";
import { HttpClient,  HttpClientModule} from "@angular/common/http";

import { NgbPaginationModule } from "@ng-bootstrap/ng-bootstrap";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { routing } from "./app.routing";
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    HttpClientModule,
    routing,
    NgbPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
