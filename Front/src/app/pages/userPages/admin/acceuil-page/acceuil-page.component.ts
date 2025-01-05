import { Component, inject, OnInit, signal } from '@angular/core';  // Import necessary Angular modules
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";  // Import loading screen component
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";  // Import dashboard component
import { HeaderComponent } from "../../../../components/header-user/header.component";  // Import header component
import { UserDataService } from '../../../../services/userData/user-data.service';  // Import user data service to fetch user data
import { FormsModule } from '@angular/forms';  // Import FormsModule to handle forms
import { CommonModule } from '@angular/common';  // Import CommonModule for common Angular directives
import { ActivatedRoute } from '@angular/router';  // Import ActivatedRoute to access route parameters
import { PostModulesService } from '../../../../services/postModules/post-modules.service';  // Import service for handling post requests

@Component({
  selector: 'app-acceuil-page',  // Component selector
  standalone: true,  // Indicating that this component is standalone
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, FormsModule, CommonModule],  // List of components and modules used
  templateUrl: './acceuil-page.component.html',  // HTML template for the component
  styleUrl: './acceuil-page.component.css'  // CSS file for styling the component
})

export class AcceuilPageComponent implements OnInit{

  isDashBoardVisible = true;  // Flag to control dashboard visibility
  isCreeDPI = signal(false);  // Signal to control whether the "Create DPI" form is visible
  user = inject(UserDataService).getUserData();  // Inject UserDataService and fetch user data
  postServices = inject(PostModulesService);  // Inject PostModulesService for handling patient data creation
  id!: number;  // Variable to store user ID
  rout = inject(ActivatedRoute);  // Inject ActivatedRoute to access route parameters

  // Patient data object to store information when creating a DPI
  patientData = {
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
    nss: "",
    mutuelle: "",
  }

  // Function to update the visibility of the dashboard
  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;  // Update the isDashBoardVisible flag based on the parameter
  }

  ngOnInit(): void {
    // Subscribe to route parameters and fetch the user ID from the URL
    this.rout.paramMap.subscribe((params) => {
      this.id = Number(params.get("id"));  // Convert the id parameter to a number and assign it to this.id
    });

    // Log a message to check if the conversion of a non-numeric value to a number is successful
    console.log("HELLLLO ?", isNaN(Number('kjfdb')));  // Log whether 'kjfdb' is a valid number (should be false)
  }

  // Function to handle DPI creation with validation
  creerDPI() {
    // Check if all required fields are filled out
    if (!this.patientData.address || !this.patientData.user || !this.patientData.date_naissance
      || !this.patientData.phone_number || !this.patientData.nss || !this.patientData.mutuelle) {
      alert("Veuillez remplir tous les champs pour créer un DPI");  // Show an alert if any field is missing
    } else {
      // If all fields are filled, call the service to create the patient data
      this.postServices.createPatient(this.patientData);  // Call the post service to create the patient DPI
      this.isCreeDPI.set(false);  // Close the DPI creation form
    }
  }

  // Function to handle the cancel action for DPI creation
  annuler(event: MouseEvent) {
    // If the click event target is either the grey div or the cancel button, close the DPI form
    if ((event.target as HTMLElement).classList.contains('grey-div') || 
      (event.target as HTMLElement).classList.contains('annuler')) {
      this.isCreeDPI.set(false);  // Set the signal to false to hide the DPI creation form
    }
  }
}
