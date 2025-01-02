import { Injectable } from "@angular/core";
import { InventoryInteractor } from "../../../domain/ports/in/inventory.interactor";
import { InventoryService } from "../../../domain/ports/out/inventory.service";
import { Inventory } from "../../../domain/models/Inventory";

@Injectable({ providedIn: 'root' })
export class InventoryInteractorAdapter implements InventoryInteractor {
    constructor(
        private inventoryService: InventoryService
    ) { }

    async getInventories(): Promise<Inventory[]> {
        const response: any = await this.inventoryService.getInventories().finally().catch(e => e);
        if (response.meta.status == 'ok') {
            return response.data;
        } else {
            throw response.data.idMensaje;
        }
    }
    async getInventoryBySku(sku: string): Promise<Inventory> {
        const response: any = await this.inventoryService.getInventoryBySku(sku).finally().catch(e => e);
        if (response.meta.status == 'ok') {
            return response.data;
        } else {
            throw response.data.idMensaje;
        }
    }
    async getInventoryById(idInventory: number): Promise<Inventory> {
        const response: any = await this.inventoryService.getInventoryById(idInventory).finally().catch(e => e);
        if (response.meta.status == 'ok') {
            return response.data;
        } else {
            throw response.data.idMensaje;
        }
    }
    async saveInventory(inventory: Inventory): Promise<Inventory> {
        const response: any = await this.inventoryService.saveInventory(inventory).finally().catch(e => e);
        if (response.meta.status == 'ok') {
            return response.data;
        } else {
           throw response.data.idMensaje;
        }
    }
}