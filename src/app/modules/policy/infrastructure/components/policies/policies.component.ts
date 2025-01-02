import { Component, OnInit } from '@angular/core';
import { Policy } from '../../../domain/models/Policy';
import { PolicyInteractor } from '../../../domain/ports/in/policy.interactor';

@Component({
    selector: 'app-policies',
    templateUrl: './policies.component.html',
    styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
    policies: Policy[] = [];

    constructor(
        private policyInteractor: PolicyInteractor
    ) { }

    async ngOnInit() {
        await this.getPolicies();
    }

    async getPolicies() {
        const res = await this.policyInteractor.getPolicies();
        this.policies = res.filter(r => r.status == 1).sort((a,b) => b.idPolicy! - a.idPolicy!);
    }

    async deletePolicy(idPolicy: number) {
        try {
            const res = await this.policyInteractor.deletePolicy(idPolicy);                
            alert('Eliminado con exito.');
            await this.getPolicies();
        } catch (error) {
            alert(error);
        }
    }
}
