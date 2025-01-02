import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './modules/core/infrastructure/componentes/navbar/navbar.component';
import { EmployeeComponents, EmployeeModule } from './modules/employee/config/employee.module';
import { HttpClientModule } from '@angular/common/http';
import { InventoryComponents, InventoryModule } from './modules/inventory/config/inventory.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PolicyComponents, PolicyModule } from './modules/policy/config/policy.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeComponents,
    InventoryComponents,
    PolicyComponents,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    EmployeeModule,
    HttpClientModule,
    InventoryModule,
    ReactiveFormsModule,
    FormsModule,
    PolicyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
