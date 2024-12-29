import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute } from '@angular/router';
import { DPI, Patient } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-consulter-dpi',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './consulter-dpi.component.html',
  styleUrl: './consulter-dpi.component.css'
})

export class ConsulterDPIComponent implements OnInit{

  isDashBoardVisible = true;

  fetchServices = inject(FetchModulesService);
  id!: number ; //id de patient
  patient !: Patient  ;  // ! means it will surely be initialised  
  Dpi !: DPI ;
  user = inject(UserDataService).getUserData() ;  //Njibou Data te3 user te3na 

  router = inject(ActivatedRoute); //bihe njibou id fel path

  ngOnInit(): void {
      
    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

    this.fetchServices.fetchPatient(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((pat) => {

      this.patient = pat; //fetch patient
    })

    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

    this.fetchServices.fetchDPI(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((d) => {

      this.Dpi = d; //fetch DPI
    })

  }

  isInformationsPatient = signal(false); //si on clique 3la infos patients tweli vrai

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
