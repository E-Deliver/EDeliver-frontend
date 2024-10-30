import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { ClientService } from 'src/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  user: any;
  clients: any[] = [];  // Store the list of clients
  selectedClient: any = null;  // Store the client details when selected

  currentPage: number = 1;  // Track the current page number
  itemsPerPage: number = 5;  // Number of clients to show per page
  totalPages: number = 0;  // Total number of pages
  paginatedClients: any[] = [];  // Subset of clients to display on the current page

  constructor(private clientService: ClientService, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchClients();  // Fetch clients when the component is initialized
    this.user = this.authService.getUserData();
  }

  // Fetch the list of clients and set pagination
  fetchClients(): void {
    this.clientService.getAllClients().subscribe(
      (data) => {
        this.clients = data;
        this.totalPages = Math.ceil(this.clients.length / this.itemsPerPage);
        this.updatePaginatedClients();
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
      },
      (error) => {
        console.error('Failed to fetch client details', error);
      }
    );
  }

  // Update the subset of clients to display on the current page
  updatePaginatedClients(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedClients = this.clients.slice(start, end);
  }

  // Navigate to a specific page
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedClients();
    }
  }
}
