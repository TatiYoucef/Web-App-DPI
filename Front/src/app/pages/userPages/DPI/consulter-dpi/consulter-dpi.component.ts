import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import {  UserDataService } from '../../../../services/userData/user-data.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute , Router} from '@angular/router';
import { DPI, Patient } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulter-dpi',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './consulter-dpi.component.html',
  styleUrl: './consulter-dpi.component.css'
})

export class ConsulterDPIComponent implements OnInit{

  isDashBoardVisible = true;

  //fetchServices = inject(FetchModulesService);
  id!: number ; //id de patient
  patient !: Patient  ;  // ! means it will surely be initialised  
  Dpi !: DPI ; 
  http = inject(HttpClient)
  router = inject(ActivatedRoute); //bihe njibou id fel path
  navigation = inject(Router);
  ngOnInit(): void {
    
    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

    const loginUrl = `http://127.0.0.1:8000/api/auth/get/medcin/patient/${this.id}`;
    this.http.get(loginUrl).subscribe({
      next: (response:any)=>{
       console.log(response.user) 
       
        
       this.patient  = {
        idUser: response.user.id,
        id: response.user.id,
        id_DPI:response.dossier,
        nss:response.nss,
        nomUser : response.user.username ,
        nom : response.user.first_name ,
        prenom : response.user.last_name ,
        naissance: response.date_naissance,
        adresse: response.address,
        tel: response.phone_number,
        mutuelle:response.mutuelle,
        qrcode:"9iwiti"
       }
        
        
      },

      error : (error: any) =>{
      console.error('Error fetching patient:', error);
     }

     

     
    });

    

    

   /* this.fetchServices.fetchPatient(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((pat) => {

      this.patient = pat; //fetch patient
    })*/

    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });
    
   /* this.fetchServices.fetchDPI(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((d) => {

      this.Dpi = d; //fetch DPI
    })*/

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
