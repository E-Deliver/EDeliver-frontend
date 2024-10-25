import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/services/utilisateur.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  profileData: any;
  usersByRole: any;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private utilisateurService: UtilisateurService
  ) {}

  ngOnInit(): void {
    // Fetch user data from AuthService
    this.user = this.authService.getUserData();

    // Fetch user profile data
    this.getProfile();

    // Fetch users by role (e.g., ADMINISTRATEUR)
    this.getUsersByRole('ADMINISTRATEUR');
 
  }

  // Fetch user profile
  getProfile() {
    this.utilisateurService.getUserProfile().subscribe(
      data => {
        this.profileData = data;
        console.log('Profile Data:', this.profileData);
      },
      error => {
        console.error('Error fetching profile:', error);
      }
    );
  }

  // Fetch users by role
  getUsersByRole(role: string) {
    this.utilisateurService.getUsersByRole(role).subscribe(
      data => {
        this.usersByRole = data;
        console.log('Users with role', role, ':', this.usersByRole);
      },
      error => {
        console.error('Error fetching users by role:', error);
      }
    );
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/']); 
  }
}

