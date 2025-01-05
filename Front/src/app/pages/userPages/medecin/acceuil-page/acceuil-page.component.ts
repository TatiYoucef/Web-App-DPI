import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { Patient } from '../../../../modules/types';
import { DPI } from '../../../../modules/types';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModulesService } from '../../../../services/postModules/post-modules.service';

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule, ZXingScannerModule], // Imports other components and modules for this page
  templateUrl: './acceuil-page.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent implements OnInit {

  isDashBoardVisible = true; // Determines if the dashboard is visible
  id!: number; // Doctor ID retrieved from the route
  rout = inject(ActivatedRoute); // Injects ActivatedRoute to get route parameters
  router = inject(Router); // Injects Router for navigation

  postServices = inject(PostModulesService); // Service for posting data
  fetchServices = inject(FetchModulesService); // Service for fetching data

  user = inject(UserDataService).getUserData();  // Retrieves user data from the service
  isCreeDPI = signal(false); // Tracks if the user clicked on "Create DPI"
  isRecherchePatient = signal(false); // Tracks if the user clicked on "Search Patient"

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible; // Updates visibility of the dashboard
  }

  ngOnInit(): void { // On initialization, fetch patient data
    this.rout.paramMap.subscribe((params) => {
      this.id = Number(params.get("id")); // Get doctor ID from the route
    });
  }

  nssInput = ''; // Input for patient's NSS (National Social Security number)
  isScanning = false; // Flag to control QR scanner visibility

  onScanSuccess(result: string) { // QR code scan success handler
    console.log('QR Code scanned: ', result);

    if (isNaN(Number(result))) { // Check if scanned value is not a valid NSS number
      alert("Veuillez scanner un nombre entier de nss de patient");
      this.isRecherchePatient.set(false);
    } else {
      this.nssInput = result; // Set NSS input value to scanned result
      this.recherchePatient(); // Trigger patient search
    }
  }

  onScanFailure(error: any) { // QR code scan failure handler
    console.error('Scan failed: ', error);
  }

  patientData = { // Patient data object for creating or searching patient
    user: {
      username: "",
      email: "",
      role: 'Patient',
      first_name: "",
      last_name: ""
    },
    date_naissance: "",
    address: "",
    phone_number: "",
    nss: this.nssInput, // Link NSS input to patient data
    mutuelle: "",
  }

  creerDPI() { // Function to create a DPI (patient data record)
    if (!this.patientData.address || !this.patientData.user || !this.patientData.date_naissance
      || !this.patientData.phone_number || !this.patientData.nss || !this.patientData.mutuelle) {
      alert("Veuillez remplir tous les champs pour créer un DPI"); // Alert if any field is missing
    } else {
      this.postServices.createPatient(this.patientData); // Call service to create patient DPI
      this.isCreeDPI.set(false); // Hide create DPI form
    }
  }

  recherchePatient() { // Function to search patient by NSS and navigate to its DPI
    if (isNaN(Number(this.nssInput))) { // Check if NSS input is valid
      alert("Veuillez scanner un nombre entier de nss de patient");
      this.isRecherchePatient.set(false);
    } else {
      this.fetchServices.fetchPatientNss(Number(this.nssInput)).pipe( // Fetch patient data using NSS
        catchError((err) => {
          console.log(err);
          alert("Nss saisie est erroné, veillez resaisir"); // Alert if NSS is incorrect
          this.isRecherchePatient.set(false);
          this.nssInput = "";
          throw err;
        })
      ).subscribe(async (patient) => { // Navigate to patient's DPI page upon successful search
        this.router.navigate(['medecin/consulter-DPI', patient.id]);
      })
    }
  }

  annulerRecherche(event: MouseEvent) { // Function to cancel the search or create DPI form
    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler')) {
      this.isCreeDPI.set(false); // Reset create DPI form visibility
      this.isRecherchePatient.set(false); // Reset search patient form visibility
    }
  }
}
