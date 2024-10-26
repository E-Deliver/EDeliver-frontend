import { Component, OnInit } from '@angular/core';
import { LivreurService } from 'src/services/livreur.service'; // Adjust the path if needed

@Component({
  selector: 'app-livreurs',
  templateUrl: './livreurs.component.html',
  styleUrls: ['./livreurs.component.css']
})
export class LivreursComponent implements OnInit {

  allLivreurs: any[] = [];  // Store the list of all livreurs
  availableLivreurs: any[] = [];  // Store the list of available livreurs

  constructor(private livreurService: LivreurService) { }

  ngOnInit(): void {
    this.fetchAllLivreurs();  // Fetch all livreurs on component initialization
    this.fetchAvailableLivreurs();  // Fetch only available livreurs on component initialization
  }

  // Method to fetch all livreurs
  fetchAllLivreurs(): void {
    this.livreurService.getAllLivreurs().subscribe(
      (data) => {
        this.allLivreurs = data;
        console.log('All Livreurs:', this.allLivreurs);  // For debugging
      },
      (error) => {
        console.error('Error fetching all livreurs', error);
      }
    );
  }

  // Method to fetch only available livreurs
  fetchAvailableLivreurs(): void {
    this.livreurService.getAvailableLivreurs().subscribe(
      (data) => {
        this.availableLivreurs = data;
        console.log('Available Livreurs:', this.availableLivreurs);  // For debugging
      },
      (error) => {
        console.error('Error fetching available livreurs', error);
      }
    );
  }
}
