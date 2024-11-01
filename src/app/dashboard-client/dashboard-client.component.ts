import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { CommandeService } from 'src/services/commande.service';

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardClientComponent implements OnInit {
  user: any;
  commandes: any[] = [];
  totalCommandes: number = 0;
  deliveredCount: number = 0;
  pendingCount: number = 0;
  constructor(private authService: AuthService, private router: Router,private commandeService: CommandeService,) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData(); 
    this.loadCommandes();

  }
  loadCommandes(): void {
    // Reset counters to ensure correct counts
    this.totalCommandes = 0;
    this.deliveredCount = 0;
    this.pendingCount = 0;
  
    // Combine both requests into a single observable
    forkJoin({
      delivered: this.commandeService.getCommandesByClientIdAndStatus(this.user.id, 'Delivered'),
      pending: this.commandeService.getCommandesByClientIdAndStatus(this.user.id, 'En cours')
    }).subscribe(
      (results) => {
        // Assign the results from each request to the counters and the commandes array
        this.deliveredCount = results.delivered.length;
        this.pendingCount = results.pending.length;
        this.totalCommandes = this.deliveredCount + this.pendingCount;
  
        // Combine both lists of commandes for display
        this.commandes = [...results.delivered, ...results.pending];
        
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes', error);
      }
    );
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/']); 
  }
}