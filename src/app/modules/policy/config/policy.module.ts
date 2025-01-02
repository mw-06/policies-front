import { RouterModule, Routes } from "@angular/router";
import { PoliciesComponent } from "../infrastructure/components/policies/policies.component";
import { PolicyService } from "../domain/ports/out/policy.service";
import { NgModule } from "@angular/core";
import { PolicyInteractor } from "../domain/ports/in/policy.interactor";
import { PolicyInteractorAdapter } from "../infrastructure/adapters/in/policy.interactor.adapter";
import { PolicyServiceAdapter } from "../infrastructure/adapters/out/policy.service.adapter";
import { PolicyFormComponent } from "../infrastructure/components/policy-form/policy-form.component";

const routes: Routes = [
    { path: 'policy/policies', component: PoliciesComponent},
    { path: 'policy/policies/create', component: PolicyFormComponent},
    { path: 'policy/policies/update/:idPolicy', component: PolicyFormComponent}
];
export const PolicyComponents = [
    PoliciesComponent,
    PolicyFormComponent
];

@NgModule({
    providers: [
        {
            provide: PolicyService,
            useClass: PolicyServiceAdapter
        },
        {
            provide: PolicyInteractor,
            useClass: PolicyInteractorAdapter
        }
    ],
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [
        RouterModule
    ]
})

export class PolicyModule {}