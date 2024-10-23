import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';
import { CommandeService } from 'src/services/commande.service';
@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})


export class CommandesComponent implements OnInit {

  user: any;

  commandes: any[] = [];  // Store the list of commandes

  constructor(@Inject(CommandeService) private commandeService: CommandeService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authService.getUserData(); 
    this.fetchCommandes();  // Fetch commandes when the component is initialized
  }

  fetchCommandes(): void {
    this.commandeService.getCommandes().subscribe(
      (data) => {
        this.commandes = data;
        console.log(this.commandes);  // You can remove this after verifying data retrieval
      },
      (error) => {
        console.error('Failed to fetch commandes', error);
      }
    );
  }

  // Méthode pour choisir un livreur
  choisirLivreur(commande: any) {
    // Logique pour ouvrir un modal ou assigner un livreur
    console.log("Choisir un livreur pour la commande : ", commande.idCommande);
    // Ici, vous pouvez ajouter la logique pour ouvrir un modal et sélectionner un livreur.
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/']); 
  }
}
