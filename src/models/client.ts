export class Client {
    id_client: number;  
    adresse: string;
    telephone: string;
    email: string;
  
    constructor(id_client: number, adresse: string, telephone: string, email: string) {
      this.id_client = id_client;
      this.adresse = adresse;
      this.telephone = telephone;
      this.email = email;
    }
  }
  