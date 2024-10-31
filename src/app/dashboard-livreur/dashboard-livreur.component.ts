import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CommandeService } from 'src/services/commande.service';  // Import the CommandeService

@Component({
  selector: 'app-dashboard-livreur',
  templateUrl: './dashboard-livreur.component.html',
  styleUrls: ['./dashboard-livreur.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardLivreurComponent implements OnInit {
  user: any;
  livreeCount: number = 0;
  nonLivreeCount: number = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private commandeService: CommandeService  // Inject CommandeService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.loadCommandeStats();
  }

  loadCommandeStats(): void {
    this.commandeService.getCommandeStats().subscribe((data) => {
      this.livreeCount = data.livree;
      this.nonLivreeCount = data.nonLivree;
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
