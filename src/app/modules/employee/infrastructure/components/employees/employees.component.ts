import { Component, OnInit } from '@angular/core';
import { Employee } from '../../../domain/models/Employee';
import { EmployeeInteractor } from '../../../domain/ports/in/employee.interactor';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
    employees: Employee[] = [];

    constructor(
        private employeeInteractor: EmployeeInteractor
    ) { }

    async ngOnInit() {
        await this.getEmployees();
    }

    async getEmployees() {
        try {
            this.employees = await this.employeeInteractor.getEmployees();            
        } catch(err: any) {
            alert(err);
        }
    }
}
