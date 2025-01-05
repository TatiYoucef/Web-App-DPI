import { Component, inject, signal } from '@angular/core'; // Import necessary Angular core features
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service'; // Service to fetch data from the server
import { Patient } from '../../../../modules/types'; // Patient type definition
import { ActivatedRoute, Router } from '@angular/router'; // Router and ActivatedRoute for routing and capturing parameters
import { catchError } from 'rxjs'; // Catch errors in observables
import QRCode from 'qrcode'; // QRCode library to generate QR codes
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component"; // Loading screen component
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component"; // Dashboard component
import { HeaderComponent } from "../../../../components/header-user/header.component"; // Header component
import { CommonModule } from '@angular/common'; // Common Angular module for general functionality
import { UserDataService } from '../../../../services/userData/user-data.service'; // Service for user data

@Component({
  selector: 'app-gestion-patients', // Component selector
  standalone: true, // Indicates that this component is standalone
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, CommonModule], // Importing necessary components and modules
  templateUrl: './gestion-patients.component.html', // Template URL for the component's HTML
  styleUrl: './gestion-patients.component.css' // Stylesheet for the component
})
export class GestionPatientsComponent {

  isDashBoardVisible = true; // Flag to control the visibility of the dashboard
  
  fetchServices = inject(FetchModulesService); // Inject the FetchModulesService to retrieve patient data
  listePatient = signal<Array<Patient>>([]); // Signal to store and react to patient list updates
  user = inject(UserDataService).getUserData(); // Inject and retrieve user data
  id!: number; // Patient ID, initialized later from the route

  router = inject(Router); // Inject the router for navigation
  rout = inject(ActivatedRoute); // Inject ActivatedRoute to access route parameters

  ngOnInit(): void { // Lifecycle hook that runs when the component is initialized
    this.fetchServices.fetchListePatientSansCompte().pipe( // Fetch the list of patients without accounts, handling errors
      catchError((err) => {
        console.log(err); // Log any errors
        throw err;
      })
    ).subscribe(async (liste) => { // Once data is fetched, process the patient list
      const listeWithQrCode = await Promise.all(
        liste.map(async (patient) => ({
          ...patient,
          qrcode: await this.generateQRCode(Number(patient.nss)), // Generate QR code for each patient
        }))
      );
      this.listePatient.set(listeWithQrCode); // Update the patient list with QR codes
    });

    this.rout.paramMap.subscribe((params) =>{ // Capture the patient ID from the route parameters
      this.id = Number(params.get("id")); // Assign the patient ID from the route parameter
    });
  }

  updateDashboardVisibility(isVisible: boolean) { // Method to update the visibility of the dashboard
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  private generateQRCode(nss: number): Promise<string> { // Generate a QR code based on the patient's NSS
    return QRCode.toDataURL(nss.toString()); // Return a promise with the Base64-encoded QR code string
  }

  goConsult(id: number) { // Method to navigate to the page for creating a patient's account
    this.router.navigate(['admin', this.user.id, 'gestionPatient', id]); // Navigate to the specified route with the patient ID
  }
}
