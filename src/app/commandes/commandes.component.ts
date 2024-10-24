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
    // Fetch available livreurs
    this.livreurService.getAvailableLivreurs().subscribe(
      (data) => {
        this.livreurs = data;  // Populate livreurs list
    
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
          html: `
            <form id="livreurForm">
              ${livreurOptions}
            </form>
          `,
          showCancelButton: true,
          confirmButtonText: 'Assigner',
          preConfirm: () => {
            const selectedLivreurElement = document.querySelector('input[name="livreur"]:checked') as HTMLInputElement;
            if (!selectedLivreurElement) {
              Swal.showValidationMessage('Veuillez sélectionner un livreur');
              return null;
            }
            return selectedLivreurElement.value;
          }
        }).then((result) => {
          if (result.isConfirmed && result.value) {
            const livreurId = Number(result.value);
            if (!isNaN(livreurId)) {
              this.assignerLivreur(commande.idCommande, livreurId);
            } else {
              Swal.fire('Erreur', 'Identifiant du livreur invalide', 'error');
            }
          }
        });
      },
      (error) => {
        console.error('Failed to fetch livreurs', error);
      }
    );
  }
  
  assignerLivreur(commandeId: number, livreurId: number) {
    if (isNaN(commandeId) || isNaN(livreurId)) {
      Swal.fire('Erreur', 'Les identifiants sont invalides', 'error');
      return;
    }
  
    this.commandeService.assignerLivreur(commandeId, livreurId).subscribe(
      () => {
        Swal.fire('Succès', 'Commande assignée avec succès au livreur', 'success');
        this.fetchCommandes();  // Refresh the commandes list
      },
      (error) => {
        Swal.fire('Erreur', 'Impossible d\'assigner la commande au livreur', 'error');
        console.error('Failed to assign livreur', error);
      }
    );
  }  

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}