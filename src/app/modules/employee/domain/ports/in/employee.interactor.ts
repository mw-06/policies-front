import { Employee } from "../../models/Employee";

export abstract class EmployeeInteractor {
    abstract getEmployees(): Promise<Employee[]>;
    abstract getEmployeeById(idEmployee: number): Promise<Employee>;
    abstract saveEmployee(employee: Employee): Promise<Employee>;
    abstract updateEmployee(employee: Employee): Promise<Employee>;    
}