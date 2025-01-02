import { Policy } from "../../models/Policy";

export abstract class PolicyService {
    abstract getPolicies(): Promise<any>;
    abstract getPolicyById(idPolicy: number): Promise<any>;
    abstract savePolicy(policy: Policy): Promise<any>;
    abstract deletePolicy(idPolicy: number): Promise<any>;
}