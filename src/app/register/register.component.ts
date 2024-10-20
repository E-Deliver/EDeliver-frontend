import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {

  formData = {
    nom: '',
    localisation: '',
    email: '',
    motDePasse: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

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

  onSubmit() {
    this.authService.registerLivreur(this.formData).subscribe({
      next: (response) => {
        console.log(response); 
        Swal.fire({
          icon: 'success', 
          title: 'Succès',
          text: 'Inscription réussie!', 
          showConfirmButton: false, 
          timer: 1500, 
        });
        this.router.navigate(['/login']); 
      },
      error: (error) => {
        console.error('Erreur lors de l’inscription', error); 
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: 'Erreur lors de l’inscription. Veuillez réessayer!', 
        });
      }
    });
  }
}
