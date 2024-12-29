import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { PatientDataService } from '../../../../services/patientData/patient-data.service';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-consulter-dpi',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './consulter-dpi.component.html',
  styleUrl: './consulter-dpi.component.css'
})
export class ConsulterDPIComponent {

  isDashBoardVisible = true;

  isInformationsPatient = signal(false); //si on clique 3la infos patients tweli vrai

  user = inject(UserDataService).getUserData() ;  //Njibou Data te3 user te3na 
  patient = inject(PatientDataService).getPatientData() ;  //Njibou Data te3 patient te3na 

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isInformationsPatient.set(false);
    }
    
  }

  informationsPatient(){
    console.log("Consultation des informations du patient.");
  }

}
