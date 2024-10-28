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
          },
          (error) => {
            commande.statut = 'Livrée'; // Mise à jour locale
            Swal.fire(
              'Livrée!',
              'La commande a été marquée comme livrée.',
              'success'
            );
          }
        );
      }
    });
  }  

  /*confirmDelivery(commande: any): void {
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
        // Appel du service pour mettre à jour le statut de la commande
        this.commandeService.updateCommandeStatus(commande.idCommande, 'Livrée').subscribe(
          (response) => {
            commande.statut = 'Livrée'; // Met à jour le statut dans l'affichage
            Swal.fire(
              'Livrée!',
              'La commande a été marquée comme livrée.',
              'success'
            );
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
  }*/

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
