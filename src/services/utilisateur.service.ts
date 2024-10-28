import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Import your AuthService

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiUrl = 'http://localhost:9090/api/utilisateurs';  // Adjust the API URL as per your backend configuration

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Get the current user's profile
  getUserProfile(): Observable<any> {
    const token = this.authService.getToken();  // Retrieve the stored auth token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Include the token in the header
    });
    return this.http.get(`${this.apiUrl}/profile`, { headers });
  }

  // Get users by role
  getUsersByRole(role: string): Observable<any> {
    const token = this.authService.getToken();  // Retrieve the stored auth token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Include the token in the header
    });
    return this.http.get(`${this.apiUrl}/role/${role}`, { headers });
  }
  updateUserProfile(profileData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  
    return this.http.put(`${this.apiUrl}/profile`, profileData, { headers });
  }
  uploadProfilePhoto(fileData: FormData): Observable<any> {
    const headers = this.createAuthHeaders().delete('Content-Type'); // Remove Content-Type header
    return this.http.post(`${this.apiUrl}/uploadPhoto`, fileData, { headers });
  }
  
  private createAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  
}
