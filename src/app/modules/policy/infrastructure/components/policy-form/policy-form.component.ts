import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Policy } from '../../../domain/models/Policy';
import { PolicyInteractor } from '../../../domain/ports/in/policy.interactor';
import { Router, ActivatedRoute } from '@angular/router';
import { InventoryInteractor } from 'src/app/modules/inventory/domain/ports/in/inventory.interactor';
import { Inventory } from 'src/app/modules/inventory/domain/models/Inventory';
import { Employee } from 'src/app/modules/employee/domain/models/Employee';
import { EmployeeInteractor } from 'src/app/modules/employee/domain/ports/in/employee.interactor';
import { EmployeeFormComponent } from 'src/app/modules/employee/infrastructure/components/employee-form/employee-form.component';

@Component({
    selector: 'app-policy-form',
    templateUrl: './policy-form.component.html',
    styleUrls: ['./policy-form.component.css']
})
export class PolicyFormComponent implements OnInit {
    @ViewChild(EmployeeFormComponent) employeeFormComponent!: EmployeeFormComponent;
    policy!: Policy;
    inventories: Inventory[] = [];
    employees: Employee[] = [];
    idEmployee!: number;
    fromPolicy: boolean = true;
    policyForm: FormGroup = new FormGroup({
        idPolicy: new FormControl(null),
        employee: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
        inventory: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
        quantity: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]+$')]),
        status: new FormControl(1, [Validators.required]),
        dateTime: new FormControl('')
    });

    constructor(
        private router: Router,
        private activateRouter: ActivatedRoute,
        private policyInteractor: PolicyInteractor,
        private inventoryInteractor: InventoryInteractor,
        private employeeInteractor: EmployeeInteractor,
    ) { }

    async ngOnInit() {
        await this.getInventories();
        await this.getEmployees();
        this.activateRouter.params.subscribe(async (res: any) => {
            if (res && res.idPolicy) {
                try { 
                    this.policy = await this.policyInteractor.getPolicyById(res.idPolicy);
                    this.policyForm.patchValue(this.policy);
                    const employee = this.employees.find(e => e.idEmployee == this.policy.employee?.idEmployee);                
                    this.policyForm.get('employee')?.setValue(employee);
                    const inventory = this.inventories.find(i => i.idInventory == this.policy.inventory?.idInventory);
                    this.policyForm.get('inventory')?.setValue(inventory);
                    this.policyForm.get('quantity')?.disable();
                    this.policyForm.get('inventory')?.disable();
                } catch(err: any) {
                    alert(err);
                }               
            }
        });
    }

    async getInventories() {
        this.inventories = await this.inventoryInteractor.getInventories();
    }

    async getEmployees() {
        this.employees = await this.employeeInteractor.getEmployees();
    }

    async save() {
        try {
            if (this.policyForm.valid) {
                this.policy = {
                    idPolicy: this.policy ? this.policy.idPolicy : undefined,
                    inventory: 
                    {
                        idInventory: this.policyForm.get('inventory')?.value.idInventory,
                        sku: this.policyForm.get('inventory')?.value.sku,
                        name: this.policyForm.get('inventory')?.value.name,
                        description: this.policyForm.get('inventory')?.value.description,
                        quantity: this.policyForm.get('inventory')?.value.quantity
                    },
                    employee: {
                        idEmployee: this.policyForm.get('employee')?.value.idEmployee,
                        firstName: this.policyForm.get('employee')?.value.firstName,
                        middleName: this.policyForm.get('employee')?.value.middleName,
                        lastName: this.policyForm.get('employee')?.value.lastName,
                        secondLastName: this.policyForm.get('employee')?.value.secondLastName,
                        position: this.policyForm.get('employee')?.value.position
                    },                   
                    quantity: this.policyForm.get('quantity')?.value,
                    status: this.policyForm.get('status')?.value,
                    dateTime: this.policyForm.get('dateTime')?.value
                }
                const res = await this.policyInteractor.savePolicy(this.policy);
                
                alert('Guardado con exito.');
                this.router.navigateByUrl('policy/policies');
            }
        } catch (err: any) {
            alert(err)
        }
    }

    sendIdEmployee() {
        const employee = this.policy?.employee ? this.policy.employee?.idEmployee! : this.policyForm.get('employee')?.value.idEmployee;
        this.employeeFormComponent.setEmployee(employee);
    }

    getIdEmployee() {
        this.employeeFormComponent.getEmployee().then(res => {
            const employee = this.employees.find(e => e.idEmployee == res.idEmployee);
            employee!.firstName = res.firstName;
            employee!.middleName = res.middleName;
            employee!.lastName = res.lastName;
            employee!.secondLastName = res.secondLastName;
            employee!.position = res.position;
    
            this.policyForm.get('employee')?.patchValue(employee);
        });
    }
}
