import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryInteractor } from '../../../domain/ports/in/inventory.interactor';
import { Inventory } from '../../../domain/models/Inventory';

@Component({
    selector: 'app-inventory-form',
    templateUrl: './inventory-form.component.html',
    styleUrls: ['./inventory-form.component.css'],
})
export class InventoryFormComponent implements OnInit {
    inventory!: Inventory;
    inventoryForm: FormGroup = new FormGroup({
        idInventory: new FormControl(null),
        sku: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
        description: new FormControl('', [Validators.required, Validators.maxLength(150)]),
        quantity: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')])
    });

    constructor(
        private router: Router,
        private activateRouter: ActivatedRoute,
        private inventoryInteractor: InventoryInteractor
    ) { }

    async ngOnInit() {
        this.activateRouter.params.subscribe(async (res: any) => {
            if (res && res.idInventory) {
                this.inventory = await this.inventoryInteractor.getInventoryById(res.idInventory);
                this.inventoryForm.patchValue(this.inventory);
                // this.setForm();
            }
        });
    }

    async save() {
        try {
            if (this.inventoryForm.valid) {
                this.inventory = {
                    idInventory: this.inventory ? this.inventory.idInventory : undefined,
                    sku: this.inventoryForm.get('sku')?.value,
                    name: this.inventoryForm.get('name')?.value,
                    description: this.inventoryForm.get('description')?.value,
                    quantity: this.inventoryForm.get('quantity')?.value,
                }
                const res = await this.inventoryInteractor.saveInventory(this.inventory);
                
                alert('Guardado con exito.');
                this.router.navigateByUrl('inventory/inventories');
            }
        } catch (err: any) {
            alert(err);
        }
    }

}
