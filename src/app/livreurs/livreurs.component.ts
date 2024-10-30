import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { LivreurService } from 'src/services/livreur.service';

@Component({
  selector: 'app-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.css']
})
export class LivreursComponent implements OnInit {
  user: any;
  allLivreurs: any[] = [];  // Store the list of all livreurs
  paginatedLivreurs: any[] = [];  // Livreurs to display on the current page
  itemsPerPage: number = 10;  // Number of items to display per page
  currentPage: number = 1;  // Current page number
  totalPages: number = 1;  // Total number of pages

  constructor(private livreurService: LivreurService, private authService: AuthService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserData();
    this.fetchAllLivreurs();
  }

  // Method to fetch all livreurs and set up pagination
  fetchAllLivreurs(): void {
    this.livreurService.getAllLivreurs().subscribe(
      (data) => {
        this.allLivreurs = data;
        this.totalPages = Math.ceil(this.allLivreurs.length / this.itemsPerPage);
        this.updatePaginatedLivreurs();  // Set paginatedLivreurs based on current page
      },
      (error) => {
        console.error('Error fetching all livreurs', error);
      }
    );
  }

  // Method to update paginatedLivreurs based on the current page
  updatePaginatedLivreurs(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedLivreurs = this.allLivreurs.slice(startIndex, endIndex);
  }

  // Method to handle page navigation
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.updatePaginatedLivreurs();
    }
  }
}
