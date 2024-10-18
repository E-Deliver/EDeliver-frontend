import { Client } from './client';  
import { Livreur } from './livreur';  

export class Commande {
  idCommande: number;  
  produits: string[];  
  adresseLivraison: string;
  statut: string;
  dateCommande: string;
  livreur: Livreur;  
  client: Client; 
  
  constructor(
    idCommande: number,
    produits: string[],
    adresseLivraison: string,
    statut: string,
    dateCommande: string,
    livreur: Livreur,
    client: Client
  ) {
    this.idCommande = idCommande;
    this.produits = produits;
    this.adresseLivraison = adresseLivraison;
    this.statut = statut;
    this.dateCommande = dateCommande;
    this.livreur = livreur;
    this.client = client;
  }
}
