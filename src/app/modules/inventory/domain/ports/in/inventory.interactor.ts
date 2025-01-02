import { Inventory } from "../../models/Inventory";

export abstract class InventoryInteractor {
    abstract getInventories(): Promise<Inventory[]>;
    abstract getInventoryBySku(sku: string): Promise<Inventory>;
    abstract getInventoryById(idInventory: number): Promise<Inventory>;
    abstract saveInventory(inventory: Inventory): Promise<Inventory>;
}