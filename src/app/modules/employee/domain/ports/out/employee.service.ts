import { Employee } from "../../models/Employee";

export abstract class EmployeeService {
    abstract getEmployees(): Promise<any>;
    abstract getEmployeeById(idEmployee: number): Promise<any>;
    abstract saveEmployee(employee: Employee): Promise<any>;
    abstract updateEmployee(employee: Employee): Promise<any>;
}