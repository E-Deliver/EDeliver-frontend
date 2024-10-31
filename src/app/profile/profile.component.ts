import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { UtilisateurService } from 'src/services/utilisateur.service';
import { NotificationService } from 'src/services/notification.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  profileData: any;
  usersByRole: any;
  selectedFile: File | null = null;  // New property for selected file

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
    this.getNotifications();
  }

  getNotifications() {
    this.notificationService.getAllNotifications().subscribe(
      data => {
        this.notifications = data;
        console.log('Notifications:', this.notifications);
      },
      error => {
        console.error('Error fetching notifications:', error);
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
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Profile updated successfully',
          confirmButtonText: 'OK'
        });
      },
      error => {
        console.error('Error updating profile:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update profile',
          confirmButtonText: 'Try Again'
        });
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
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Photo uploaded successfully',
            confirmButtonText: 'OK'
          });
        },
        error => {
          console.error('Error uploading photo:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to upload photo',
            confirmButtonText: 'Try Again'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No File Selected',
        text: 'Please select a photo to upload.',
        confirmButtonText: 'OK'
      });
    }
  }
  

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
