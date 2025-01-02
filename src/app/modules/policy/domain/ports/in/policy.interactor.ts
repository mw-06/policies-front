import { Policy } from "../../models/Policy";

export abstract class PolicyInteractor {
    abstract getPolicies(): Promise<Policy[]>;
    abstract getPolicyById(idPolicy: number): Promise<Policy>;
    abstract savePolicy(policy: Policy): Promise<Policy>;
    abstract deletePolicy(idPolicy: number): Promise<Policy>;
}