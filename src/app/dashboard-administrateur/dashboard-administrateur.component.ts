import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-dashboard-administrateur',
  templateUrl: './dashboard-administrateur.component.html',
  styleUrls: ['./dashboard-administrateur.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAdministrateurComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData(); 
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/']); 
  }
}