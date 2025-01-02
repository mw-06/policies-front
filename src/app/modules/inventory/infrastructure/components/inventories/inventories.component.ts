import { Component, OnInit } from '@angular/core';
import { Inventory } from '../../../domain/models/Inventory';
import { InventoryInteractor } from '../../../domain/ports/in/inventory.interactor';

@Component({
    selector: 'app-inventories',
    templateUrl: './inventories.component.html',
    styleUrls: ['./inventories.component.css']
})
export class InventoriesComponent implements OnInit {
    inventories: Inventory[] = [];

    constructor(
        private inventoryInteractor: InventoryInteractor
    ) { }

    async ngOnInit() {
        await this.getInventories();
    }

    async getInventories() {
        this.inventories = await this.inventoryInteractor.getInventories();
    }
}
