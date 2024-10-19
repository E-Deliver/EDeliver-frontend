import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashboardLivreurComponent } from './dashboard-livreur/dashboard-livreur.component';
import { DashboardAdministrateurComponent } from './dashboard-administrateur/dashboard-administrateur.component';

const routes: Routes = [
  { path: "", component: HomeComponent}, 
  { path: "login", component: LoginComponent},
  { path: "signup", component: RegisterComponent},
  { path: "dashboard-client", component: DashboardClientComponent},
  { path: "dashboard-livreur", component: DashboardLivreurComponent},
  { path: "dashboard-administrateur", component: DashboardAdministrateurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }