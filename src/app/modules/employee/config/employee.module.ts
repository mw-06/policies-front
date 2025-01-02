import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeService } from "../domain/ports/out/employee.service";
import { EmployeeInteractor } from "../domain/ports/in/employee.interactor";
import { EmployeeInteractorAdapter } from "../infrastructure/adapters/in/employee.interactor.adapter";
import { EmployeeServiceAdapter } from "../infrastructure/adapters/out/employee.service.adapter";
import { EmployeesComponent } from "../infrastructure/components/employees/employees.component";
import { EmployeeFormComponent } from "../infrastructure/components/employee-form/employee-form.component";

const routes: Routes = [
    { path: 'employee/employees', component: EmployeesComponent},
    { path: 'employee/employees/create', component: EmployeeFormComponent},
    { path: 'employee/employees/update/:idEmployee', component: EmployeeFormComponent},
];
export const EmployeeComponents = [
    EmployeesComponent,
    EmployeeFormComponent
];

@NgModule({
    providers: [
        {
            provide: EmployeeService,
            useClass: EmployeeServiceAdapter
        },
        {
            provide: EmployeeInteractor,
            useClass: EmployeeInteractorAdapter
        }
    ],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class EmployeeModule {}
