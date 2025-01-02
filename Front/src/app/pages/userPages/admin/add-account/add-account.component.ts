import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { Patient } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})

export class AddAccountComponent {

  isDashBoard = signal(false);

  id!: number; //id de patient li ra7 necryyoulou compte
  router = inject(ActivatedRoute); //bihe njibou id fel path
  route = inject(Router)
  patient!:Patient;
  fetchServices = inject(FetchModulesService);
  http = inject(HttpClient)
   
  ngOnInit(): void {

    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

    console.log(this.id);

    this.fetchServices.fetchPatient(this.id).pipe(
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((response: any) => {
      
      this.patient = {
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

      }; // Initialize as an empty object
      
      console.log(this.patient.nom);
    })
      
  }
    
  updateDashboardVisibility(V:boolean){
    this.isDashBoard.set(V);
  }
  
  creerCompte(username:String, password:String){
    const apiUrl = `http://127.0.0.1:8000/api/auth/get/medcin/patient/${this.id}/update`
    const Bodyrequest = {
        "username" : username ,
        "password" : password ,
    }
    this.http.put(apiUrl , Bodyrequest).subscribe({
      next: (response:any)=>{
       console.log(response.user) 
       this.route.navigate(["admin/gestionPatient"]);
      },
      error : (error: any) =>{
        console.error('Error fetching patient:', error);
      }
  });

  }
}
