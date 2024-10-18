export class Utilisateur {
  id: number; 
  nom: string;
  email: string;
  motDePasse: string;
  role: Role; 
  
  constructor(id: number = 0, nom: string = '', email: string = '', motDePasse: string = '', role: Role = Role.CLIENT) {
    this.id = id;
    this.nom = nom;
    this.email = email;
    this.motDePasse = motDePasse;
    this.role = role;
  }
}

export enum Role {
  ADMINISTRATEUR = 'ADMINISTRATEUR',
  LIVREUR = 'LIVREUR',
  CLIENT = 'CLIENT'
}