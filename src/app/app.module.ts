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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }