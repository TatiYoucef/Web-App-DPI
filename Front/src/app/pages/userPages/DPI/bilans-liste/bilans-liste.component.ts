import { Component, inject, signal } from '@angular/core'; // Import necessary Angular core features
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service'; // Service to fetch modules data
import { ActivatedRoute, Router } from '@angular/router'; // Services for navigation and route handling
import { catchError } from 'rxjs'; // RxJS operator to catch errors in streams
import { Bilan, Patient } from '../../../../modules/types'; // Types for Bilan and Patient
import { HeaderComponent } from "../../../../components/header-user/header.component"; // Header component
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component"; // Dashboard component
import { CommonModule } from '@angular/common'; // Common Angular module
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component"; // Loading screen component
import QRCode from 'qrcode'; // QRCode generation library
import { FormsModule } from '@angular/forms'; // Forms module for template-driven forms
import { UserDataService } from '../../../../services/userData/user-data.service'; // Service to fetch user data

@Component({
  selector: 'app-bilans-liste', // Component selector
  standalone: true, // Indicates that this component can be used without being part of a module
  imports: [HeaderComponent, DashBoardComponent, CommonModule, LoadingScreenComponent, FormsModule], // Imported modules and components
  templateUrl: './bilans-liste.component.html', // Path to the HTML template
  styleUrl: './bilans-liste.component.css' // Path to the CSS file
})

export class BilansListeComponent {

  isDashBoardVisible = true; // State to control the visibility of the dashboard
  isAjoutBilan = false; // State to control the display of the 'add bilan' modal
  selectedType = "Biologique"; // Default type for a new bilan

  fetchServices = inject(FetchModulesService); // Injecting the fetch service
  listeBilan = signal<Array<Bilan>>([]); // Reactive signal to store the list of bilans

  id!: number; // Patient ID
  patient!: Patient; // Patient details
  user = inject(UserDataService).getUserData(); // Fetching user data from the service
  
  rout = inject(Router); // Router for navigation
  router = inject(ActivatedRoute); // ActivatedRoute for fetching route parameters

  ngOnInit(): void { // Lifecycle hook that runs when the component initializes
      
    this.fetchServices.fetchListeBilan().pipe( // Fetch the list of bilans
      catchError((err) => {
        console.log(err); // Log any errors
        throw err;
      })
    ).subscribe(async (liste) => { this.listeBilan.set(liste); }); // Set the fetched list of bilans

    this.router.paramMap.subscribe((params) => {
      this.id = Number(params.get("id")); // Retrieve and set the patient ID from the route parameters
    });

    this.fetchServices.fetchPatient(this.id).pipe( // Fetch the patient details
      catchError((err) => {
        console.log(err); // Log any errors
        throw err;
      })
    ).subscribe(async (pat) => {
        const patQr = await Promise.resolve({
          ...pat, // Spread the fetched patient details
          qrcode: await this.generateQRCode(Number(pat.nss)), // Generate QR code for the patient's NSS
        });
        console.log(this.id); // Log the patient ID
        this.patient = patQr; // Set the patient details
      }
    );
  }

  updateDashboardVisibility(isVisible: boolean) { // Method to update the dashboard visibility
    this.isDashBoardVisible = isVisible;
  }
  
  goToBilan(idBilan: number) { // Method to navigate to a specific bilan
    const initPath = this.user.role === 'Patient' ? 'patient' : 'medecin'; // Determine path based on user role
    this.rout.navigate([initPath, 'consulter-DPI', this.id, 'Bilans', idBilan]); // Navigate to the bilan
  }

  annuler(event: MouseEvent) { // Method to cancel 'add bilan' operation

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler')) {
      this.isAjoutBilan = false; // Close the modal if the click is on the overlay or cancel button
    }
    
  }

  ajouterBilan() { // Method to add a new bilan

    if (this.listeBilan()[this.listeBilan().length - 1].tests.length === 0) { // Check if the last bilan is not filled
      this.isAjoutBilan = false; // Close the modal
      alert("Bilan non crée, il existe déja un bilan non rempli"); // Alert the user
    } else {

      this.listeBilan.update((liste) => { // Update the list of bilans

        liste.push({
          id: 0, // Default ID
          idMed: 0, // Default Med ID
          idConsul: 0, // Default Consultation ID
          type: this.selectedType, // Set the selected type
          rempli: false, // Mark as not filled
          tests: [], // Initialize tests as empty
          date: (Date.now() / (3600000 * 24)).toString(), // Set the current date
        });

        return liste; // Return the updated list
      });

      this.isAjoutBilan = false; // Close the modal
    }
  }

  private generateQRCode(nss: number): Promise<string> { // Method to generate a QR code for the patient's NSS
    return QRCode.toDataURL(nss.toString()); // Return a Base64-encoded string of the QR code
  }
}
