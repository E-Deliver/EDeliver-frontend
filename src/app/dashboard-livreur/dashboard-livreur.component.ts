import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-dashboard-livreur',
  templateUrl: './dashboard-livreur.component.html',
  styleUrls: ['./dashboard-livreur.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardLivreurComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData(); // Récupérer les données utilisateur
  }

  logout(): void {
    localStorage.clear(); // Effacer les données locales
    this.router.navigate(['/']); // Rediriger vers la page d'accueil
  }
}