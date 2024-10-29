import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { ClientService } from 'src/services/client.service';  // Adjust the path according to your structure

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
user:any
  clients: any[] = [];  // Store the list of clients
  selectedClient: any = null;  // To store the client details when selected

  constructor(private clientService: ClientService,    private authService: AuthService  ) { }

  ngOnInit(): void {
    this.fetchClients();  // Fetch clients when the component is initialized
    this.user = this.authService.getUserData();

  }

  // Fetch the list of clients
  fetchClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data;
        console.log(this.clients);  // You can remove this after verifying data retrieval
      },
      (error) => {
        console.error('Failed to fetch clients', error);
      }
    );
  }

  // Fetch details of a specific client by ID
  fetchClientDetails(id: number): void {
    this.clientService.getClientById(id).subscribe(
      (data) => {
        this.selectedClient = data;
        console.log(this.selectedClient);  // You can remove this after verifying data retrieval
      },
      (error) => {
        console.error('Failed to fetch client details', error);
      }
    );
  }
}
