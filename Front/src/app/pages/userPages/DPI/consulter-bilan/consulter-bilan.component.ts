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
  selector: 'app-consulter-bilan',
  standalone: true,
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, FormsModule, CommonModule ],
  templateUrl: './consulter-bilan.component.html',
  styleUrl: './consulter-bilan.component.css'
})

export class ConsulterBilanComponent implements OnInit{

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

    
    const loginUrl = `http://127.0.0.1:8000/api/auth/get/medcin/patient/${this.idPatient}`;
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

    this.fetchServices.fetchBilanRadio(this.patient?.id_DPI , this.idBilan).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((bil) => {

      this.bilanRadio = {

        id: bil.id,
        type: bil.type , //Biologique or Radiologique
        status : bil.status,
        images : bil.images,
        date: bil.date,
        compteRendu : bil.compteRendu,
        idRadio : bil.idRadio,
        medcin : bil.medcin,
        
      }; //fetch bilan

    });
    

  }

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;
  }

  addTest(){

   /* this.bilan.tests.push({
      id:this.bilan.tests.length,
      testName:'',
      result:null
    })*/

  }

  removeTest(index:number){

   // this.bilan.tests.splice(index, 1);

  }

  patchBilan(){
    //console.log("Bilan updated to", this.bilan);
  }
}
