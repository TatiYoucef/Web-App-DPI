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
import { PostModulesService } from '../../../../services/postModules/post-modules.service';
import { Patient } from '../../../../modules/types';

@Component({
  selector: 'app-consultations',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule],
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.css']
})
export class ConsultationsComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private fetchServices = inject(FetchModulesService);
  isDashBoardVisible = true;
  isAjoutConsultation = false;
  user = inject(UserDataService).getUserData();

  newConsultation = {
    medcin:this.user.id,
    soins:[],
    date:"",
    dateProchaineCons:"",
    trouveDiagnostic: false,
    raison_admission:""
  }

  dateInput1 = '';
  timeInput1 = '';
  dateInput2 = '';
  timeInput2 = '';

  postServices = inject(PostModulesService);
  patient !: Patient;

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

    this.fetchServices.fetchPatient(this.id)
    .pipe(
      // Use catchError to handle errors
      catchError((err) => {
        console.error('Error fetching Patient:', err);
        // Optionally rethrow or handle the error
        throw err;
      })
    )
    .subscribe((patient) => {
      this.patient = patient;
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
      .subscribe((data) => {
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

  async ajoutConsultation(){

    this.newConsultation.date = `${this.dateInput1}T${this.timeInput1}:00Z`;
    this.newConsultation.dateProchaineCons = `${this.dateInput2}T${this.timeInput2}:00Z`

    if(!this.newConsultation.raison_admission){
      alert("Veuillez ajouter la raison de consultation")
    }else{

      await this.postServices.createConsultation(this.newConsultation,this.patient.dossier);
      this.isAjoutConsultation = false;

      this.newConsultation = {
        medcin:this.user.id,
        soins:[],
        date:"",
        dateProchaineCons:"",
        trouveDiagnostic: false,
        raison_admission:""
      }

      this.fetchServices.fetchConsultations(this.id).pipe(
        catchError((err) => {
          console.error('Error fetching consultations:', err);
          this.errorMessage = 'Failed to load consultations. Please try again later.';
          throw err;
        })
      )
      .subscribe((data) => {
        this.consultations = data; // Update consultations list
        this.isLoading.set(false); // Turn off loading signal
      });

    }


  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isAjoutConsultation= false;
    }
    
  }

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

}
