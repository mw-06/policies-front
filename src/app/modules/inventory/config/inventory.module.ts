import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { InventoryInteractor } from "../domain/ports/in/inventory.interactor";
import { InventoryService } from "../domain/ports/out/inventory.service";
import { InventoryInteractorAdapter } from "../infrastructure/adapters/in/inventory.interactor.adapter";
import { InventoryServiceAdapter } from "../infrastructure/adapters/out/inventory.service.adapter";
import { InventoriesComponent } from "../infrastructure/components/inventories/inventories.component";
import { InventoryFormComponent } from "../infrastructure/components/inventory-form/inventory-form.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
    { path: 'inventory/inventories', component: InventoriesComponent},
    { path: 'inventory/inventories/create', component: InventoryFormComponent},
    { path: 'inventory/inventories/update/:idInventory', component: InventoryFormComponent}
];
export const InventoryComponents = [
    InventoriesComponent,
    InventoryFormComponent
];

@NgModule({
    providers: [
        {
            provide: InventoryService,
            useClass: InventoryServiceAdapter
        },
        {
            provide: InventoryInteractor,
            useClass: InventoryInteractorAdapter
        }
    ],
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class InventoryModule {}
