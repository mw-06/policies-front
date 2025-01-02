import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { InventoryService } from "../../../domain/ports/out/inventory.service";
import { Inventory } from "../../../domain/models/Inventory";
import { lastValueFrom } from "rxjs";

@Injectable({providedIn:'root'})
export class InventoryServiceAdapter implements InventoryService {
    api: string = environment.api;

    constructor(private http: HttpClient){}

    async getInventories(): Promise<any> {
        const request = this.http.get(`${this.api}/inventories`);
        return await lastValueFrom(request);
    }

    async getInventoryBySku(sku: string): Promise<any> {
        const request = this.http.get(`${this.api}/inventories/${sku}`);
        return await lastValueFrom(request);
    }

    async getInventoryById(idInventory: number): Promise<any> {
        const request = this.http.get(`${this.api}/inventories/${idInventory}`);
        return await lastValueFrom(request);
    }

    async saveInventory(inventory: Inventory): Promise<any> {
        const request = this.http.post(`${this.api}/inventories`, inventory);
        const data = await lastValueFrom(request);       
        return data;
    }
}