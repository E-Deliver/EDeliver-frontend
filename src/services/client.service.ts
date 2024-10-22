import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:9090/api/clients';  // Backend URL

  constructor(private http: HttpClient) {}

  // Method to get all clients
  getAllClients(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Add your token retrieval logic
      'Content-Type': 'application/json'
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  // Method to get a client by ID
  getClientById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    });
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
