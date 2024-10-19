import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  email: string = '';
  motDePasse: string = '';
  role: string = '';  // Pour stocker le rôle renvoyé

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() { }

  navigateToHome() {
    this.router.navigate(['/']);
  }
  
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  
  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
  
  login() {
    this.authService.login(this.email, this.motDePasse).subscribe(
      (response: any) => {
        const token = response.token;
        const user = response.user; // Récupérer l'utilisateur
  
        this.authService.storeToken(token);
        this.authService.storeUserData(user); // Stocker les infos utilisateur
  
        // Rediriger vers le tableau de bord en fonction du rôle
        if (user.role === 'ADMINISTRATEUR') {
          this.router.navigate(['/dashboard-administrateur']);
        } else if (user.role === 'LIVREUR') {
          this.router.navigate(['/dashboard-livreur']);
        } else if (user.role === 'CLIENT') {
          this.router.navigate(['/dashboard-client']);
        }
  
      },
      (error: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error.error || 'Une erreur est survenue.',
        });
        console.error('Erreur de connexion : ', error);
      }
    );
  }  

  // Fonction de déconnexion
  logout() {
    this.authService.clearToken();  // Méthode à ajouter pour effacer le token
    this.router.navigate(['/']);
  }
}