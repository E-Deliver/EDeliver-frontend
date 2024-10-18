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
export class LoginComponent  implements OnInit{

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

  email: string = '';
  motDePasse: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.motDePasse).subscribe(
      (response: any) => {
        const token = response.token;
        console.log(token);
        this.authService.storeToken(token);
  
        Swal.fire({
          icon: 'success',
          title: 'Connexion réussie!',
          text: response.message,
          showConfirmButton: false,
          timer: 1500
        });
  
        // this.router.navigate(['/dashboard']);
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
  
}
