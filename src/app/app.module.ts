import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { DashboardAdministrateurComponent } from './dashboard-administrateur/dashboard-administrateur.component';
import { DashboardLivreurComponent } from './dashboard-livreur/dashboard-livreur.component';
import { DashboardClientComponent } from './dashboard-client/dashboard-client.component';
import { ProfileComponent } from './profile/profile.component';
import { CommandesComponent } from './commandes/commandes.component';
import { LivreursComponent } from './livreurs/livreurs.component';
import { ClientsComponent } from './clients/clients.component';
import { CommandesClientComponent } from './commandes-client/commandes-client.component';
import { CommandesLivreurComponent } from './commandes-livreur/commandes-livreur.component';
import { HistoriqueClientComponent } from './historique-client/historique-client.component';
import { HistoriqueLivreurComponent } from './historique-livreur/historique-livreur.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { ProfileLivreurComponent } from './profile-livreur/profile-livreur.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardAdministrateurComponent,
    DashboardLivreurComponent,
    DashboardClientComponent,
    ProfileComponent,
    CommandesComponent,
    LivreursComponent,
    ClientsComponent,
    CommandesClientComponent,
    CommandesLivreurComponent,
    HistoriqueClientComponent,
    HistoriqueLivreurComponent,
    ProfileClientComponent,
    ProfileLivreurComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }