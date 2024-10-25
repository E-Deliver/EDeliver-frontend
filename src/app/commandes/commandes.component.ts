import Swal from 'sweetalert2';
import { LivreurService } from 'src/services/livreur.service';  // Import your LivreurService
import { Component, Inject, OnInit } from '@angular/core';
import { CommandeService } from 'src/services/commande.service';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  user: any;
  commandes: any[] = [];
  livreurs: any[] = [];  // Store the list of livreurs

  constructor(
    @Inject(CommandeService) private commandeService: CommandeService,
    private authService: AuthService,
    private router: Router,
    @Inject(LivreurService) private livreurService: LivreurService  // Inject LivreurService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.fetchCommandes();
  }

  fetchCommandes(): void {
    this.commandeService.getCommandes().subscribe(
      (data) => {
        this.commandes = data;
        console.log(this.commandes);
      },
      (error) => {
        console.error('Failed to fetch commandes', error);
      }
    );
  }

  // Method to open SweetAlert popup for choosing a livreur
  choisirLivreur(commande: any) {
    this.livreurService.getAvailableLivreurs().subscribe(
      (data) => {
        this.livreurs = data;
        const livreurOptions = this.livreurs.map((livreur) => {
          return `
            <label>
              <input type="radio" name="livreur" value="${livreur.id}" /> 
              ${livreur.nom}
            </label>
            <br/>
          `;
        }).join('');
   
        Swal.fire({
          title: 'Choisir un livreur',
          html: `<form id="livreurForm">${livreurOptions}</form>`,
          showCancelButton: true,
          confirmButtonText: 'Assigner',
          preConfirm: () => {
            const selectedLivreur = (document.querySelector('input[name="livreur"]:checked') as HTMLInputElement)?.value;
            if (!selectedLivreur) {
              Swal.showValidationMessage('Veuillez choisir un livreur');
            }
            return selectedLivreur;
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const livreurId = result.value ? parseInt(result.value) : null;
            if (livreurId !== null) {
              this.assignerLivreur(commande.idCommande, livreurId);
            } else {
              Swal.fire('Erreur', 'Aucun livreur sélectionné', 'error');
            }
          }
        });
      },
      (error) => {
        Swal.fire('Erreur', 'Impossible de récupérer les livreurs disponibles', 'error');
      }
    );
  }  
  
  assignerLivreur(commandeId: number, livreurId: number) {
    this.commandeService.assignerLivreur(commandeId, livreurId).subscribe(
      (response) => {
        Swal.fire('Succès', 'Livreur assigné avec succès', 'success');
        this.fetchCommandes(); // Refresh the list after assignment
      },
      (error) => {
        Swal.fire('Succès', 'Livreur assigné avec succès', 'success');
        this.fetchCommandes(); 
      }
    );
  }   

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
