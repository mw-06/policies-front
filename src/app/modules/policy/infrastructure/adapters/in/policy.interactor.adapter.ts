import { Injectable } from "@angular/core";
import { PolicyInteractor } from "../../../domain/ports/in/policy.interactor";
import { PolicyService } from "../../../domain/ports/out/policy.service";
import { Policy } from "../../../domain/models/Policy";

@Injectable({ providedIn: 'root' })
export class PolicyInteractorAdapter implements PolicyInteractor {
    constructor(
        private policyService: PolicyService
    ) { }

    async getPolicies(): Promise<Policy[]> {
        const response: any = await this.policyService.getPolicies().finally().catch(e => e);
        if (response.meta.status == 'ok') {
            return response.data;
        } else {
            throw response.data.idMensaje;
        }
    }
    async getPolicyById(idPolicy: number): Promise<Policy> {
        const response: any = await this.policyService.getPolicyById(idPolicy).finally().catch(e => e);
        if (response.meta.status == 'ok') {
            return response.data;
        } else {
            throw response.data.idMensaje;
        }
    }
    async savePolicy(policy: Policy): Promise<Policy> {
        const response: any = await this.policyService.savePolicy(policy).finally().catch(e => e);
        if (response.meta.status == 'ok') {
            return response.data;
        } else {
            throw response.data.detalleMensaje;
        }
    }
    async deletePolicy(idPolicy: number): Promise<Policy> {
        const response: any = await this.policyService.deletePolicy(idPolicy).finally().catch(e => e);
        if (response.meta.status == 'ok') {
            return response.data;
        } else {
            throw response.data.detalleMensaje;
        }
    }
}