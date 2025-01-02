import { Injectable } from "@angular/core";
import { Employee } from "../../../domain/models/Employee";
import { EmployeeInteractor } from "../../../domain/ports/in/employee.interactor";
import { EmployeeService } from "../../../domain/ports/out/employee.service";

@Injectable({providedIn:'root'})
export class EmployeeInteractorAdapter implements EmployeeInteractor {
    constructor(
        private employeeService: EmployeeService
    ){}

    async getEmployees(): Promise<Employee[]> {
        const employeeResponse: any = await this.employeeService.getEmployees().finally().catch(e => e);
        if(employeeResponse.meta.status == 'ok') {
            return employeeResponse.data;
        } else {
            throw employeeResponse.data.idMensaje;
        }
    }

    async getEmployeeById(idEmployee: number): Promise<Employee> {
        const employeeResponse: any = await this.employeeService.getEmployeeById(idEmployee).finally().catch(e => e);
        if(employeeResponse.meta.status == 'ok') {
            return employeeResponse.data;
        } else {
            throw employeeResponse.data.idMensaje;
        }
    }
    async saveEmployee(employee: Employee): Promise<Employee> {
        const employeeResponse: any = await this.employeeService.saveEmployee(employee).finally().catch(e => e);
        if(employeeResponse.meta.status == 'ok') {
            return employeeResponse.data[0];
        } else {
            throw employeeResponse.data.idMensaje;
        }
    }
    async updateEmployee(employee: Employee): Promise<Employee> {
        const employeeResponse: any = await this.employeeService.updateEmployee(employee).finally().catch(e => e);
        if(employeeResponse.meta.status == 'ok') {
            return employeeResponse.data[0];
        } else {
            throw employeeResponse.data.idMensaje;
        }
    }
}