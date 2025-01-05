import { Component, inject, NO_ERRORS_SCHEMA, OnInit, signal } from '@angular/core'; // Import necessary Angular modules
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service'; // Service to fetch module data
import { Patient } from '../../../../modules/types'; // Patient type definition
import { catchError } from 'rxjs'; // For handling errors in RxJS observables
import { HeaderComponent } from "../../../../components/header-user/header.component"; // Header component
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component"; // Dashboard component
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component"; // Loading screen component
import { CommonModule } from '@angular/common'; // Common module for Angular functionalities
import { FormsModule } from '@angular/forms'; // Forms module for handling forms
import QRCode from 'qrcode'; // QR Code generation library
import { ActivatedRoute, Router } from '@angular/router'; // Angular router for navigation
import { UserDataService } from '../../../../services/userData/user-data.service'; // Service to fetch user data


@Component({
  selector: 'app-acceuil-page', // Component selector
  standalone: true, // Indicates this is a standalone component
  imports: [HeaderComponent,DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule ], // Imported components and modules
  schemas: [NO_ERRORS_SCHEMA], // To prevent Angular from throwing errors for unknown elements or attributes
  templateUrl: './acceuil-page.component.html', // Template URL for this component
  styleUrl: './acceuil-page.component.css' // Styles URL for this component
})

export class AcceuilPageComponent implements OnInit{

  isDashBoardVisible = true; // Boolean for controlling dashboard visibility

  fetchServices = inject(FetchModulesService); // Inject FetchModulesService for fetching patient data
  listePatient = signal<Array<Patient>>([]); // Reactive signal to store the list of patients

  id!:number; // ID for routing purposes

  router = inject(Router); // Inject Angular Router for navigation
  rout = inject(ActivatedRoute); // Inject ActivatedRoute for capturing route parameters
  user = inject(UserDataService).getUserData(); // Inject UserDataService to get user data

  ngOnInit(): void { // On component initialization, fetch patient data
    this.fetchServices.fetchListePatientHospitalised().pipe( // Fetch the list of hospitalized patients and handle errors
      catchError((err) => {
        console.log(err); // Log error to console
        throw err; // Re-throw the error
      })
    ).subscribe(async (liste) => { // Subscribe to the patient list observable
        const listeWithQrCode = await Promise.all( // Generate QR codes for each patient asynchronously
          liste.map(async (patient) => ({
            ...patient,
            qrcode: await this.generateQRCode(Number(patient.nss)), // Await QR code generation
          }))
        );
        this.listePatient.set(listeWithQrCode); // Set the patient list with QR codes
    });

    this.rout.paramMap.subscribe((params) => { // Subscribe to route parameters
      this.id = Number(params.get("id")); // Get and set the 'id' parameter from the route
    });
  }

  updateDashboardVisibility(isVisible: boolean) { // Method to update dashboard visibility
    console.log('Dashboard visibility updated:', isVisible); // Log visibility update
    this.isDashBoardVisible = isVisible; // Set the visibility state
  }

  goConsult(id:number){ // Method to navigate to consultation page based on user role
    if(this.user.role === "Infirmier"){ // If the user is an 'Infirmier'
      this.router.navigate([`rabLabInf/${this.user.id}/ajoutSoin/`, id]); // Navigate to the "add care" page
    } else { // If the user is not an 'Infirmier'
      this.router.navigate([`rabLabInf/${this.user.id}/joindreBilan/`, id]); // Navigate to the "join report" page
    }
  }

  private generateQRCode(nss: number): Promise<string> { // Private method to generate QR code for a patient's NSS
    return QRCode.toDataURL(nss.toString()); // Generate and return the QR code as a Base64-encoded string
  }

}
