import { Inventory } from "../../models/Inventory";

export abstract class InventoryService {
    abstract getInventories(): Promise<any>;
    abstract getInventoryBySku(sku: string): Promise<any>;
    abstract getInventoryById(idInventory: number): Promise<any>;
    abstract saveInventory(inventory: Inventory): Promise<any>;
}