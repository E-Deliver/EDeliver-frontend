import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private authUrl = 'http://localhost:9090/auth';

  constructor(private http: HttpClient) { }

  login(email: string, motDePasse: string): Observable<any> {
    return this.http.post<any>(`${this.authUrl}/login`, { email, motDePasse });
  }

  registerLivreur(livreurData: any): Observable<any> {
    return this.http.post('http://localhost:9090/auth/registerLivreur', livreurData, { responseType: 'text' });
  }  

  storeToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  storeUserData(user: any): void {
    localStorage.setItem('userData', JSON.stringify(user));
  }

  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  clearToken(): void {
    localStorage.removeItem('authToken');
  }
}
