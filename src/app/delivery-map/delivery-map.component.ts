import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { AuthService } from 'src/services/auth.service';

interface Command {
  coords: [number, number]; // Define coords as a tuple with exactly two numbers
  address: string;
  status: string;
  commandId: string;
}

@Component({
  selector: 'app-delivery-map',
  templateUrl: './delivery-map.component.html',
  styleUrls: ['./delivery-map.component.css']
})
export class DeliveryMapComponent implements AfterViewInit {
  private map: L.Map | undefined;
  user: any;
  constructor(private authService: AuthService){}
  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }
  ngAfterViewInit(): void {
    this.initMap();

    // Mock data with explicit tuple typing for coords
    const commands: Command[] = [
      {
        coords: [31.80, -7.10], // Correct tuple with exactly two elements
        address: '123 Rue Example, Casablanca',
        status: 'Delivered',
        commandId: 'CMD12345'
      },
      {
        coords: [31.81, -7.11],
        address: '456 Avenue Test, Marrakech',
        status: 'Pending',
        commandId: 'CMD67890'
      }
    ];

    // Add markers for each command
    commands.forEach(command => {
      this.addCommandMarker(command.coords, command.address, command.status, command.commandId);
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [31.7917, -7.0926],
      zoom: 10
    });

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri'
    }).addTo(this.map);
  }

  // Method to add a marker for each command with popup info
  private addCommandMarker(coords: [number, number], address: string, status: string, commandId: string): void {
    if (!this.map) {
      console.error('Map is not initialized');
      return;
    }

    const popupContent = `
      <div style="font-size: 14px;">
        <b>Adresse:</b> ${address}<br>
        <b>statut:</b> ${status}<br>
      </div>
    `;

    // Adding a marker with a popup
    L.marker(coords)
      .addTo(this.map)
      .bindPopup(popupContent)
      .openPopup();
  }
}
