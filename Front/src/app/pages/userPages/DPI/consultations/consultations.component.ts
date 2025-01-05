import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../../../components/header-user/header.component';
import { DashBoardComponent } from '../../../../components/dash-board/dash-board.component';
import { LoadingScreenComponent } from '../../../../components/loading-screen/loading-screen.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule],
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {
  private route = inject(ActivatedRoute); // Injects ActivatedRoute for accessing route parameters
  private fetchServices = inject(FetchModulesService); // Service to fetch module-related data
  isDashBoardVisible = true; // Controls visibility of the dashboard
  isAjoutConsultation = false; // Controls visibility of the "Add Consultation" form
  user = inject(UserDataService).getUserData(); // Fetches user data from the service

  isDiagnosed = false; // Tracks if the consultation is diagnosed
  dateSet = Date.now(); // Default date set for the consultation
  raisonSet = ""; // Reason for admission

  consultations: any[] = []; // List of consultations
  selectedConsultation: any = null; // Selected consultation details for popup
  isPopupVisible = signal(false); // Signal to control popup visibility
  isLoading = signal(true); // Signal to control loading state
  errorMessage: string | null = null; // Error message for API failures
  id!: number; // Patient ID

  ngOnInit(): void {
    // Lifecycle hook triggered when the component initializes
    // Retrieve patient ID from route parameters
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id'); // Extract 'id' parameter from route
      if (idParam) {
        this.id = +idParam; // Convert ID to a number
        this.loadConsultations(); // Fetch consultations after getting the ID
      } else {
        this.errorMessage = 'Patient ID not provided in the URL.'; // Error if ID is missing
      }
    });
  }

  loadConsultations() {
    // Fetches consultations for the given patient ID
    this.fetchServices
      .fetchConsultations(this.id) // Fetch consultations from the service
      .pipe(
        catchError((err) => {
          // Handle errors during the API call
          console.error('Error fetching consultations:', err); // Log error
          this.errorMessage = 'Failed to load consultations. Please try again later.'; // Set error message
          this.isLoading.set(false); // Turn off loading signal
          throw err; // Re-throw the error
        })
      )
      .subscribe((data: any[]) => {
        this.consultations = data; // Update consultations list
        this.isLoading.set(false); // Turn off loading signal
      });
  }

  showDetails(consultation: any) {
    // Display popup with consultation details
    this.selectedConsultation = consultation; // Set selected consultation
    this.isPopupVisible.set(true); // Show popup
  }

  closePopup() {
    // Close the popup
    this.isPopupVisible.set(false); // Hide popup
    this.selectedConsultation = null; // Clear selected consultation
  }

  ajoutConsultation() {
    // Add a new consultation
    console.log("Ajouter une consultation", this.isDiagnosed, "/", this.raisonSet); // Log consultation details
    this.isAjoutConsultation = false; // Hide the "Add Consultation" form
  }

  annuler(event: MouseEvent) {
    // Cancel adding a consultation
    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler')) {
      // Check if the clicked element is part of the cancellation process
      this.isAjoutConsultation = false; // Hide the "Add Consultation" form
    }
  }

  updateDashboardVisibility(isVisible: boolean) {
    // Update dashboard visibility
    console.log('Dashboard visibility updated:', isVisible); // Log visibility state
    this.isDashBoardVisible = isVisible; // Set dashboard visibility state
  }
}
