import { Utilisateur } from './utilisateur';  

export class Livreur extends Utilisateur {
  id_Livreur: number; 
  localisation: string;
  etat: EtatLivreur;  

  constructor(id_Livreur: number, localisation: string, etat: EtatLivreur) {
    super(); 
    this.id_Livreur = id_Livreur;
    this.localisation = localisation;
    this.etat = etat;
  }
}

export enum EtatLivreur {
  DISPONIBLE = 'DISPONIBLE',
  EN_LIVRAISON = 'EN_LIVRAISON',
  INACTIF = 'INACTIF'
}
