import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core'; // Import necessary Angular modules
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component"; // Import custom loading screen component
import { HeaderComponent } from "../../../../components/header-user/header.component"; // Import custom header component
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component"; // Import custom dashboard component
import { BilanBio, BilanRadio, MedicalRecord, TestBilan } from '../../../../modules/types'; // Import types for various medical records and tests
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service'; // Import service to fetch modules
import { catchError } from 'rxjs'; // Import catchError for handling errors
import { UserDataService } from '../../../../services/userData/user-data.service'; // Import service for user data
import { ActivatedRoute, Router } from '@angular/router'; // Import Angular's router and activated route for navigation
import { CommonModule } from '@angular/common'; // Import Angular's common module for general functionality
import { FormsModule } from '@angular/forms'; // Import FormsModule for handling forms in Angular
import { UpdateModulesService } from '../../../../services/updateModules/update-modules.service'; // Import service for updating modules

@Component({
  selector: 'app-ajout-result-bilan', // Component selector for usage in templates
  standalone: true, // Declare the component as standalone
  imports: [LoadingScreenComponent, HeaderComponent, DashBoardComponent, CommonModule, FormsModule], // Declare the components and modules to be used
  templateUrl: './ajout-result-bilan.component.html', // Template URL for the component's HTML
  styleUrl: './ajout-result-bilan.component.css' // Style URL for the component's CSS
})

export class AjoutResultBilanComponent implements OnInit { // Component class implementing OnInit lifecycle hook

  isDashBoardVisible = true; // Boolean to toggle the visibility of the dashboard

  user = inject(UserDataService).getUserData(); // Inject the UserDataService and fetch user data

  id!: number; // Declare patient id
  idP!: number; // Declare another patient-related id
  router = inject(ActivatedRoute); // Inject the ActivatedRoute to get route parameters
  rout = inject(Router); // Inject Router for navigation

  fetchServices = inject(FetchModulesService); // Inject FetchModulesService for fetching data
  updateServices = inject(UpdateModulesService); // Inject UpdateModulesService for updating data
  listTestsBilan !: BilanBio; // Declare list of biological test requests for a bilan
  compteRendu !: BilanRadio ; // Declare report for radiological bilan
  length = 0; // Declare length of the test list

  ngOnInit(): void { // Initialize component and subscribe to route parameters
    this.router.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); // Get patient id from route parameters
      this.idP = Number(params.get("idP")); // Get another patient id from route parameters
    });

    if(this.user.role === 'Radiologue'){ // If the user is a radiologist, fetch radiological bilan
      this.fetchServices.fetchListeBilanRadioIncompleted(this.id).pipe( // Fetch incomplete radiological bilans and handle errors
        catchError((err) => {
          console.log(err);
          throw err;
        })
      ).subscribe((liste) => {
        if(liste.length) this.compteRendu = liste[0]; // Set compteRendu if data is available
        this.length = liste.length; // Update the length
      })

    } else { // If the user is not a radiologist, fetch biological test bilan
      this.fetchServices.fetchListeBilanBioIncompleted(this.id).pipe( // Fetch incomplete biological bilans and handle errors
        catchError((err) => {
          console.log(err);
          throw err;
        })
      ).subscribe((liste) => {
        if(liste.length) this.listTestsBilan = liste[0]; // Set listTestsBilan if data is available
        this.length = liste.length; // Update the length
      })
    }
  }

  enregistrerBilan(){ // Function to submit the bilan
    if(this.user.role === 'Radiologue'){ // If the user is a radiologist
      this.updateServices.ajoutComptRenduForPatient(this.compteRendu.compte_rendu, this.compteRendu.id).subscribe({ // Call the service to save the compte rendu
        next: (response:any)=>{
          console.log(response) 
          alert("Bilan radiologique est sauvegardé !") // Display success message
          this.rout.navigate(['rabLabInf', this.idP]); // Navigate to another page after saving
        },

        error : (error: any) =>{
          console.error('Error fetching patient:', error); // Log the error
          alert("Il a eut un problème de saisie, veuillez ajouter correctement le saisie") // Display error message
        }

      })

    } else { // If the user is not a radiologist
      this.updateServices.ajoutResultsBioForPatient(this.listTestsBilan.resultats_analytiques, this.listTestsBilan.id).subscribe({ // Call the service to save biological test results
        next: (response:any)=>{
          console.log(response) 
          alert("Bilan biologique est sauvegardé !") // Display success message
          this.rout.navigate(['rabLabInf', this.idP]); // Navigate to another page after saving
        },

        error : (error: any) =>{
          console.error('Error fetching patient:', error); // Log the error
          alert("Il a eut un problème de saisie, veuillez ajouter correctement le saisie") // Display error message
        }

      })

    }
  }
    
  updateDashboardVisibility(isVisible: boolean) { // Function to update the visibility of the dashboard
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible; // Update the dashboard visibility status
  }

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Access the hidden file input element using ViewChild

  selectedFile: File | null = null; // Declare the selected file variable
  previewUrl: string | null = null; // Declare the preview URL variable for the selected file

  triggerFileInput(): void { // Function to trigger the file input programmatically
    this.fileInput.nativeElement.click(); // Trigger the file input click event
  }

  removeFile(): void{ // Function to remove the selected file
    this.selectedFile = null; // Reset selected file
    this.previewUrl = null; // Reset preview URL
  }

  onFileSelected(event: Event): void { // Function to handle file selection
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) { // Check if files are selected
      const file = input.files[0]; // Get the first selected file

      // Validate file extension
      const validExtensions = ['jpg', 'jpeg', 'png']; // Valid image extensions
      const fileExtension = file.name.split('.').pop()?.toLowerCase(); // Get the file extension

      if (fileExtension && validExtensions.includes(fileExtension)) { // If the file extension is valid
        this.selectedFile = file; // Set selected file
        this.previewFile(file); // Preview the selected file

      } else { // If the file extension is invalid
        alert("Fichier invalide. S'il vous plait selectionnez une photo"); // Display invalid file type message
        this.selectedFile = null; // Reset selected file
        this.previewUrl = null; // Reset preview URL
      }

    }
  }

  previewFile(file: File): void { // Function to preview the selected file
    const reader = new FileReader(); // Create a new FileReader instance
    reader.onload = (e) => {
      this.previewUrl = e.target?.result as string; // Set preview URL once file is loaded
    };
    reader.readAsDataURL(file); // Read the file as a DataURL
  }

}
