import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CommandeService } from 'src/services/commande.service';

@Component({
  selector: 'app-historique-livreur',
  templateUrl: './historique-livreur.component.html',
  styleUrls: ['./historique-livreur.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HistoriqueLivreurComponent implements OnInit {
  user: any;
  commandes: any[] = []; // Stocke les commandes du livreur
  currentPage: number = 1; // Page actuelle
  itemsPerPage: number = 5; // Nombre d'éléments par page

  constructor(
    private authService: AuthService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData(); 
    this.loadCommandes();
  }

  loadCommandes(): void {
    if (this.user && this.user.id) {
      this.commandeService.getCommandesByLivreurId(this.user.id).subscribe(
        (commandes) => {
          this.commandes = commandes;
        },
        (error) => {
          console.error("Erreur lors de la récupération des commandes :", error);
        }
      );
    }
  }

  paginatedCommandes(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.commandes.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number {
    return Math.ceil(this.commandes.length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return; // Validate page number
    this.currentPage = page;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
