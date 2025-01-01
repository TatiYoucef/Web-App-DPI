import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { DPI2, Patient2 } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consulter-dpi',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './consulter-dpi.component.html',
  styleUrl: './consulter-dpi.component.css',
  providers: [DatePipe]
})

export class ConsulterDPIComponent implements OnInit{

  isDashBoardVisible = true;

  fetchServices = inject(FetchModulesService);
  id!: number ; //id de patient
  patient !: Patient2  ;  // ! means it will surely be initialised  
  dossier !: DPI2 ;
  user = inject(UserDataService).getUserData() ;  //Njibou Data te3 user te3na 

  router = inject(ActivatedRoute); //bihe njibou id fel path
  navigation = inject(Router);

  ngOnInit(): void {

    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

    this.fetchServices.fetchDPI(this.id)
  .pipe(
    // Use catchError to handle errors
    catchError((err) => {
      console.error('Error fetching DPI:', err);
      // Optionally rethrow or handle the error
      throw err;
    })
  )
  
  .subscribe((response) => {
    // Extract the dossier and patient from the response
    this.dossier = response.dossier; // Assign dossier to this.dossier
    this.patient = response.patient; // Optionally handle patient if needed
    console.log('Dossier:', this.dossier);
    console.log('Patient:', this.patient);
  });

}

  isInformationsPatient = signal(false); //si on clique 3la infos patients tweli vrai
  isAntecedentPatient = signal(false);

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isInformationsPatient.set(false);
      this.isAntecedentPatient.set(false);
    }
    
  }

  informationsPatient(){
    console.log("Consultation des informations du patient.");
  }

  mettreAjourAntecedent(){
    console.log("Antecedents patché...");
  }

  // Navigate to the consultations page
  viewConsultations() {
    const consultationsUrl = `/consulter-DPI/${this.id}/consultations`;
    this.navigation.navigate([consultationsUrl]);
  }

}
