import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../../../domain/models/Employee';
import { EmployeeInteractor } from '../../../domain/ports/in/employee.interactor';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-employee-form',
    templateUrl: './employee-form.component.html',
    styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
    @Input() fromPolicy: boolean = false;
    @Input() idEmployee = new EventEmitter<number>();
    @Output() sendEmployee = new EventEmitter<Employee>();
    employee!: Employee;
    employeeForm: FormGroup = new FormGroup({
        idEmployee: new FormControl(null),
        firstName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
        middleName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
        lastName: new FormControl('', [Validators.required, Validators.maxLength(200)]),
        secondLastName: new FormControl('', [Validators.maxLength(200)]),
        position: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    constructor(
        private router: Router,
        private activateRouter: ActivatedRoute,
        private employeeInteractor: EmployeeInteractor
    ) { }

    async ngOnInit() {
        this.activateRouter.params.subscribe(async (res: any) => {
            if (res && res.idEmployee) {
                this.employee = await this.employeeInteractor.getEmployeeById(res.idEmployee);
                this.employeeForm.patchValue(this.employee);
            }
        });
    }

    async setEmployee(idEmployee: number) {
        this.employee = await this.employeeInteractor.getEmployeeById(idEmployee);
        this.employeeForm.patchValue(this.employee);
    }

    async getEmployee(): Promise<Employee> {
        return this.employeeForm.getRawValue();
    }

    async save() {
        try {
            if (this.employeeForm.valid) {
                this.employee = {
                    idEmployee: this.employee ? this.employee.idEmployee : undefined,                                
                    firstName: this.employeeForm.get('firstName')?.value,
                    middleName: this.employeeForm.get('middleName')?.value,
                    lastName: this.employeeForm.get('lastName')?.value,
                    secondLastName: this.employeeForm.get('secondLastName')?.value,
                    position: this.employeeForm.get('position')?.value,                    
                }

                if(this.employee && this.employee.idEmployee) {
                    const res = await this.employeeInteractor.updateEmployee(this.employee);                    
                } else {
                    const res = await this.employeeInteractor.saveEmployee(this.employee);
                }
                
                alert('Guardado con exito.');
                this.router.navigateByUrl('employee/employees');                
            }
        } catch (err: any) {
            alert(err)
        }
    }
}
