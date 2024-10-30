import Swal from 'sweetalert2';
import { LivreurService } from 'src/services/livreur.service';
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
  livreurs: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  paginatedCommandes: any[] = [];

  constructor(
    @Inject(CommandeService) private commandeService: CommandeService,
    private authService: AuthService,
    private router: Router,
    @Inject(LivreurService) private livreurService: LivreurService
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
        this.currentPage = 1; // Ensure the first page is selected
        this.updatePaginatedCommandes(); // Update paginated data after commandes is set
      },
      (error) => {
        console.error('Failed to fetch commandes', error);
      }
    );
  }

  updatePaginatedCommandes() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedCommandes = this.commandes.slice(startIndex, endIndex);
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePaginatedCommandes();
  }

  get totalPages() {
    return Math.ceil(this.commandes.length / this.itemsPerPage);
  }

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
        Swal.fire('Erreur', 'Impossible d\'assigner le livreur', 'error');
      }
    );
  }   

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
