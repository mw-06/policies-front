import { Employee } from "src/app/modules/employee/domain/models/Employee";
import { Inventory } from "src/app/modules/inventory/domain/models/Inventory";

export interface Policy {
    idPolicy?: number;
    employee: Employee;
    inventory: Inventory;
    quantity: number;
    dateTime: string;
    status: number;
}