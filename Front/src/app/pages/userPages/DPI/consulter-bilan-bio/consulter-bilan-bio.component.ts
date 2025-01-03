import { Component, inject, OnInit } from '@angular/core';
import { BilanRadio, BilanBio , TestBilan , Patient } from '../../../../modules/types';
import { ActivatedRoute } from '@angular/router';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consulter-bilan-bio',
  standalone: true,
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './consulter-bilan-bio.component.html',
  styleUrl: './consulter-bilan-bio.component.css'
})
export class ConsulterBilanBioComponent {
  isDashBoardVisible = true;
  fetchServices = inject(FetchModulesService);
  idPatient!:number ; //id patient
  idBilan!:number ; //id bilan
  bilanBio!:BilanBio;
  bilanRadio!:BilanRadio;
  user = inject(UserDataService).getUserData();
  http = inject(HttpClient)
  router = inject(ActivatedRoute); //bihe njibou id fel path
  patient !: Patient ;

  ngOnInit(): void {

    this.router.paramMap.subscribe((params) =>{
      this.idPatient =Number(params.get("id1")); //id de patient récupéré
      this.idBilan =Number(params.get("id2")); //id de bilan récupéré
    });
    

    this.fetchServices.fetchBilanBio(this.idBilan).subscribe({
    
      next : (response:any)=>{
        this.bilanBio = {
         id: response.id,
         type: response.typeBilan, //Biologique or Radiologique
         status : response.status,
         resultats_analytiques : response.resultats_analytiques,
         date: response.date_prescription,
         description : response.description,
         idLabo : response.radiologue,
         medcin : response.medcin,
        }
      },

      error : (error) =>{
     
      },

    
    
    //pipe to catch any error
    });
  }
    
  updateDashboardVisibility( isVisible : boolean) {
    this.isDashBoardVisible = isVisible;
  }
   


  

}


