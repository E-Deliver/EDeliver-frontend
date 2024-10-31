import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { StatisticsService } from 'src/services/statistics.service';

@Component({
  selector: 'app-dashboard-administrateur',
  templateUrl: './dashboard-administrateur.component.html',
  styleUrls: ['./dashboard-administrateur.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardAdministrateurComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router,private statisticsService: StatisticsService) {}
  totalCommands: number = 0;
  totalClients: number = 0;
  totalLivreurs: number = 0;


  ngOnInit(): void {
              this.user = this.authService.getUserData(); 

    this.statisticsService.getStatistics().subscribe((data) => {
      this.totalCommands = data.totalCommands;
      this.totalClients = data.totalClients;
      this.totalLivreurs = data.totalLivreurs;

    });

  }


  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/']); 
  }
}