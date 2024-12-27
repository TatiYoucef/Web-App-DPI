import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Medcin, Patient, User } from '../../../../modules/types';
@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent {
  router= inject(Router); 
  userDataService = inject(UserDataService);
  errorMessage : string = '';
  http = inject(HttpClient);
  isDashBoard = signal(false);
  user = inject(UserDataService).getUserData() ;  //Njibou Data te3 user te3na 

  isCreeDPI = signal(false);
  isRecherchePatient = signal(false); //si on clique 3la recherche wella créer, ywellou vrai

  changeDashState(){
    this.isDashBoard.update((e) => !e);
  }

  annulerRecherche(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isCreeDPI.set(false);
      this.isRecherchePatient.set(false);
    }
    
  }

  creerDPI(){
    const nss = (document.getElementById('nss') as HTMLInputElement).value;
    const nom = (document.getElementById('nom') as HTMLInputElement).value;
    const prenom = (document.getElementById('prenom') as HTMLInputElement).value;
    const nomUser = (document.getElementById('nom_utilisateur') as HTMLInputElement).value;
    const adress = (document.getElementById('adresse') as HTMLInputElement).value;
    const date_naissance = (document.getElementById('date_naissance') as HTMLInputElement).value;
    const tel = (document.getElementById('tel') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    const mutuelle = (document.getElementById('mutuelle') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    console.log('HIIII');


    const patientData ={
      user: {
        username: nomUser,
        email: email,
        password: password, // Ajouter le mot de passe
        role: 'Patient',
        first_name: prenom,
        last_name: nom
      },
      date_naissance: date_naissance,
      address: adress,
      phone_number: tel,
      nss: nss,
      mutuelle: mutuelle
    };
    
    console.log(patientData);

    const apiUrl = 'http://127.0.0.1:8000/api/auth/register/patient' ;
    
    this.http.post(apiUrl , patientData).subscribe({
      next: (response:any)=>{
        console.log(response);
      },
      error : (error: any) =>{
        console.error('Error fetching patient:', error);
      }
    });

  }

  recherchePatient( nss: String ){
    const loginUrl = `http://127.0.0.1:8000/api/auth/get/patient/${nss}`;
    this.http.get(loginUrl).subscribe({
      next: (response:any)=>{
       let user: User = {
        id: response.user.id,
        nomUser : response.user.username ,
        nom : response.user.first_name ,
        prenom : response.user.last_name ,
        naissance: response.date_naissance,
        adresse: response.address,
        tel: response.phone_number,
        role : response.user.role
      }
        console.log(user)
        this.userDataService.setUserData(user);
        this.router.navigate(["patient"]);
      },

      error : (error: any) =>{
      console.error('Error fetching patient:', error);
     }
    });
 
  }
}
