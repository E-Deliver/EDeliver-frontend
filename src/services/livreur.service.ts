import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Ensure AuthService is imported

@Injectable({
  providedIn: 'root'
})
export class LivreurService {
  private livreursUrl = 'http://localhost:9090/api/livreurs';  // Base URL for livreurs API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to get only available livreurs
  getAvailableLivreurs(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(`${this.livreursUrl}/disponibles`, { headers });
  }

  // Method to get all livreurs, regardless of their availability
  getAllLivreurs(): Observable<any[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any[]>(this.livreursUrl, { headers });
  }
}
