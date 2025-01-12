import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './compenonts/login/login.component';
import { FeeContractsComponent } from './compenonts/fee-contracts/fee-contracts.component';
import { CreateFeeContractComponent } from './compenonts/create-fee-contract/create-fee-contract.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'FeeDetails', component: FeeContractsComponent,canActivate: [AuthGuard] }, 
  { path: 'FeeContract', component: CreateFeeContractComponent ,canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
