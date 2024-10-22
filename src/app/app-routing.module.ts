import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { DashboardLivreurComponent } from './dashboard-livreur/dashboard-livreur.component';
import { DashboardAdministrateurComponent } from './dashboard-administrateur/dashboard-administrateur.component';
import { ProfileComponent } from './profile/profile.component';
import { CommandesComponent } from './commandes/commandes.component';
import { LivreursComponent } from './livreurs/livreurs.component';
import { ClientsComponent } from './clients/clients.component';

const routes: Routes = [
  { path: "", component: HomeComponent}, 
  { path: "login", component: LoginComponent},
  { path: "signup", component: RegisterComponent},
  { path: "dashboard-client", component: DashboardClientComponent},
  { path: "dashboard-livreur", component: DashboardLivreurComponent},
  { path: "dashboard-administrateur", component: DashboardAdministrateurComponent},
  { path: 'profile', component: ProfileComponent }, 
  { path: 'commandes', component: CommandesComponent }, 
  { path: 'historique', component: CommandesComponent }, 
  { path: 'livreurs', component: LivreursComponent}, 
  { path: 'clients', component: ClientsComponent }, 


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }