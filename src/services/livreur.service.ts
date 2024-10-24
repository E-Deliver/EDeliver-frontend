import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Assuming you have an AuthService for token management

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private livreursUrl = 'http://localhost:9090/api/livreurs';  // Backend API URL for livreurs

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get available livreurs (only those with EtatLivreur.DISPONIBLE)
  getAvailableLivreurs(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.livreursUrl}/disponibles`, { headers });
  }
}
