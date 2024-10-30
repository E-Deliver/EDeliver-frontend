import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CommandeService } from 'src/services/commande.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-commandes-livreur',
  templateUrl: './commandes-livreur.component.html',
  styleUrls: ['./commandes-livreur.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommandesLivreurComponent implements OnInit {
  user: any;
  commandes: any[] = []; // Stocke les commandes du livreur
  paginatedCommandes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Change this value to display more or fewer items per page
  totalPages: number = 0;

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
          this.totalPages = Math.ceil(this.commandes.length / this.itemsPerPage);
          this.updatePaginatedCommandes();
        },
        (error) => {
          console.error("Erreur lors de la récupération des commandes :", error);
        }
      );
    }
  }

  updatePaginatedCommandes(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCommandes = this.commandes.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCommandes();
    }
  }

  confirmDelivery(commande: any): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Voulez-vous confirmer la livraison de cette commande ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, livrer !',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.commandeService.updateCommandeStatut(commande.idCommande, 'Livrée').subscribe(
          (response) => {
            commande.statut = 'Livrée'; // Mise à jour locale
            Swal.fire(
              'Livrée!',
              'La commande a été marquée comme livrée.',
              'success'
            );
            this.loadCommandes(); // Reload the commandes to refresh the list
          },
          (error) => {
            Swal.fire(
              'Erreur',
              "Une erreur est survenue lors de la mise à jour de la commande.",
              'error'
            );
          }
        );
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
