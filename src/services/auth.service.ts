import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:9090/auth';

  constructor(private http: HttpClient) { }

  // Correction : Assurez-vous que l'objet envoyé a bien les mêmes noms de clés que le backend attend
  login(email: string, motDePasse: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { email, motDePasse });
  }

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
