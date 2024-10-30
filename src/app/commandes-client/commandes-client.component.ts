import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CommandeService } from 'src/services/commande.service';

@Component({
  selector: 'app-commandes-client',
  templateUrl: './commandes-client.component.html',
  styleUrls: ['./commandes-client.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CommandesClientComponent implements OnInit {
  user: any;
  commandes: any[] = [];
  currentPage: number = 1; // Current page number
  itemsPerPage: number = 10; // Number of items per page
  totalPages: number = 0; // Total number of pages

  constructor(private authService: AuthService, private commandeService: CommandeService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.loadCommandes();
  }

  loadCommandes(): void {
    this.commandeService.getCommandesByClientIdAndStatus(this.user.id, 'En cours').subscribe(
      (data) => {
        this.commandes = data;
        this.totalPages = Math.ceil(this.commandes.length / this.itemsPerPage); // Calculate total pages
      },
      (error) => {
        console.error('Erreur lors de la récupération des commandes', error);
      }
    );
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return; // Validate page number
    this.currentPage = page;
    this.loadPaginatedCommandes();
  }

  loadPaginatedCommandes(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.commandes = this.commandes.slice(startIndex, endIndex); // Slice the commandes for pagination
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
