import { Component, Inject, OnInit } from '@angular/core';
import { CommandeService } from 'src/services/commande.service';
@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})


export class CommandesComponent implements OnInit {

  commandes: any[] = [];  // Store the list of commandes

  constructor(@Inject(CommandeService) private commandeService: CommandeService) { }

  ngOnInit(): void {
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
}

