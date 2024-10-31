import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:9090/api/notifications';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllNotifications(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(this.apiUrl, { headers });
  }

  getNotificationsByClientId(clientId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/client?clientId=${clientId}`, { headers });
  }

  getCommandesByClientAndLivreur(clientId: number, livreurId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.get<any>(`${this.apiUrl}/client-livreur?clientId=${clientId}&livreurId=${livreurId}`, { headers });
  }

}
