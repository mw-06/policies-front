import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { PolicyService } from "../../../domain/ports/out/policy.service";
import { Policy } from "../../../domain/models/Policy";

@Injectable({providedIn:'root'})
export class PolicyServiceAdapter implements PolicyService {
    api: string = environment.api;

    constructor(private http: HttpClient){}

    async getPolicies(): Promise<any> {
        const request = this.http.get(`${this.api}/policies`);
        return await lastValueFrom(request);
    }
    async getPolicyById(idPolicy: number): Promise<any> {
        const request = this.http.get(`${this.api}/policies/${idPolicy}`);
        return await lastValueFrom(request);
    }
    async savePolicy(policy: Policy): Promise<any> {
        const request = this.http.post(`${this.api}/policies`, policy);
        return await lastValueFrom(request);
    }
    async deletePolicy(idPolicy: number): Promise<any> {
        const request = this.http.put(`${this.api}/policies/delete/${idPolicy}`, {});
        return await lastValueFrom(request);
    }

}