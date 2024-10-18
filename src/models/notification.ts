import { Client } from './client';  

export class Notification {
  idNotification: number;
  message: string;
  dateEnvoi: Date;
  client: Client;
  
  constructor(idNotification: number, message: string, dateEnvoi: Date, client: Client) {
    this.idNotification = idNotification;
    this.message = message;
    this.dateEnvoi = dateEnvoi;
    this.client = client;
  }
}
