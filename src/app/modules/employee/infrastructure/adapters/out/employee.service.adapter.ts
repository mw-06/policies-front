import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { Employee } from "../../../domain/models/Employee";
import { EmployeeService } from "../../../domain/ports/out/employee.service";

@Injectable({providedIn:'root'})
export class EmployeeServiceAdapter implements EmployeeService {
    api: string = environment.api;

    constructor(private http: HttpClient){}

    async getEmployees(): Promise<any> {
        const request = this.http.get(`${this.api}/employees`);
        return await lastValueFrom(request);
    }
    async getEmployeeById(idEmployee: number): Promise<any> {
        const request = this.http.get(`${this.api}/employees/${idEmployee}`);
        return await lastValueFrom(request);
    }
    async saveEmployee(employee: Employee): Promise<any> {
        const request = this.http.post(`${this.api}/employees`, employee);
        return await lastValueFrom(request);
    }
    async updateEmployee(employee: Employee): Promise<any> {
        const request = this.http.put(`${this.api}/employees`, employee);
        return await lastValueFrom(request);
    }
}