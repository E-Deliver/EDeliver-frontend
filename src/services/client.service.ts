import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Make sure to import AuthService

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:9090/api/clients';  // Backend URL

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Method to get all clients
  getAllClients(): Observable<any[]> {
    const token = this.authService.getToken(); // Retrieve the token using AuthService
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Method to get a client by ID
  getClientById(id: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
