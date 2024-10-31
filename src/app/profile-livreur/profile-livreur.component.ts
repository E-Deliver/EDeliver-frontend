import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/services/utilisateur.service';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-profile-livreur',
  templateUrl: './profile-livreur.component.html',
  styleUrls: ['./profile-livreur.component.css']
})



export class ProfileLivreurComponent  implements OnInit  {



    user: any;
    profileData: any;
    usersByRole: any;
    selectedFile: File | null = null;  // New property for selected file

    commandes: any;

    notifications: any[] = [];
  
    constructor(
      private authService: AuthService, 
      private router: Router, 
      private utilisateurService: UtilisateurService,
      private notificationService: NotificationService
    ) {}
  
    ngOnInit(): void {
      this.user = this.authService.getUserData();
      this.getProfile();
      this.getUsersByRole('ADMINISTRATEUR');

      this.getCommandesForClientAndLivreur();
      
    }

    getCommandesForClientAndLivreur() {
      const clientId = this.user.clientId; // Assurez-vous que l'ID du client est accessible
      const livreurId = this.user.id;      // ID de l'utilisateur connecté (livreur)
  
      this.notificationService.getCommandesByClientAndLivreur(clientId, livreurId).subscribe(
        data => {
          this.commandes = data;
          console.log('Commandes:', this.commandes);
        },
        error => {
          console.error('Erreur lors de la récupération des commandes:', error);
        }
      );
    }
  
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
  
    saveProfileChanges() {
      this.utilisateurService.updateUserProfile(this.profileData).subscribe(
        response => {
          console.log('Profile updated successfully:', response);
          alert('Profile updated successfully');
        },
        error => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile');
        }
      );
    }
  
    // File selection handler
    onFileSelected(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input && input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        console.log('Selected file:', this.selectedFile); // Log to confirm
      } else {
        this.selectedFile = null;
        console.log('No file selected'); // Log if no file is selected
      }
    }
    
  
    // File upload handler
    uploadPhoto() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
    
        this.utilisateurService.uploadProfilePhoto(formData).subscribe(
          response => {
            console.log('Photo uploaded successfully:', response);
            this.profileData.filePath = response.filePath;  // Assuming the backend returns the path
            alert('Photo uploaded successfully');
          },
          error => {
            console.error('Error uploading photo:', error);
            alert('Failed to upload photo');
          }
        );
      } else {
        alert('Please select a photo to upload.');
      }
    }
    
  
    logout(): void {
      localStorage.clear();
      this.router.navigate(['/']);
    }
  }
  


