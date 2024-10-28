import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CommandeService } from 'src/services/commande.service';

@Component({
  selector: 'app-historique-client',
  templateUrl: './historique-client.component.html',
  styleUrls: ['./historique-client.component.css'] ,
  encapsulation: ViewEncapsulation.None
})
export class HistoriqueClientComponent implements OnInit {
  user: any;
  commandes: any[] = [];

  constructor(private authService: AuthService, private commandeService: CommandeService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.loadCommandes();
  }

  loadCommandes() {
    // Assume that user.id is the client ID
    this.commandeService.getCommandesByClientIdAndStatus(this.user.id, 'Livrée').subscribe(
      (data) => {
        this.commandes = data;
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