import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from '../../../../components/header-user/header.component';
import { DashBoardComponent } from '../../../../components/dash-board/dash-board.component';
import { LoadingScreenComponent } from '../../../../components/loading-screen/loading-screen.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private fetchServices = inject(FetchModulesService);
  isDashBoardVisible = true;

  consultations: any[] = []; // List of consultations
  selectedConsultation: any = null; // Selected consultation details for popup
  isPopupVisible = signal(false); // Popup visibility signal
  isLoading = signal(true); // Loading signal
  errorMessage: string | null = null; // Error message for API failures
  id!: number; // Patient ID

  ngOnInit(): void {
    // Retrieve patient ID from route parameters
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = +idParam; // Convert ID to a number
        this.loadConsultations(); // Fetch consultations after getting the ID
      } else {
        this.errorMessage = 'Patient ID not provided in the URL.';
      }
    });
  }

  loadConsultations() {
    this.fetchServices
      .fetchConsultations(this.id)
      .pipe(
        catchError((err) => {
          console.error('Error fetching consultations:', err);
          this.errorMessage = 'Failed to load consultations. Please try again later.';
          this.isLoading.set(false); // Turn off loading signal
          throw err;
        })
      )
      .subscribe((data: any[]) => {
        this.consultations = data; // Update consultations list
        this.isLoading.set(false); // Turn off loading signal
      });
  }

  showDetails(consultation: any) {
    // Display popup with consultation details
    this.selectedConsultation = consultation;
    this.isPopupVisible.set(true);
  }

  closePopup() {
    // Close the popup
    this.isPopupVisible.set(false);
    this.selectedConsultation = null;
  }

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

}
