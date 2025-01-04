import { Component, inject, OnInit, signal } from '@angular/core';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PostModulesService } from '../../../../services/postModules/post-modules.service';

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent implements OnInit{

  isDashBoardVisible = true;
  isCreeDPI = signal(false);
  user = inject(UserDataService).getUserData() ;  //Njibou Data te3 user te3na 
  postServices = inject(PostModulesService)  
  id!:number;

  patientData = { //this will be filled in creerDPI
    user: {
      username:"",
      email: "",
      role: 'Patient',
      first_name: "",
      last_name: ""
    },
    date_naissance: "",
    address: "",
    phone_number: "",
    nss: "",
    mutuelle: "",
  }

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;
  }

  ngOnInit(): void {

    const rout = inject(ActivatedRoute);
    rout.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); //id de user récupéré
    });



  }

  creerDPI(){ //post function to create DPI with verification

    if(!this.patientData.address || !this.patientData.user || !this.patientData.date_naissance
      || !this.patientData.phone_number || !this.patientData.nss || !this.patientData.mutuelle
    ) alert("Veuillez remplir tous les champs pour créer un DPI");

    else{
      this.postServices.createPatient(this.patientData);
      this.isCreeDPI.set(false);
    }

  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || 
      (event.target as HTMLElement).classList.contains('annuler') ) {

      this.isCreeDPI.set(false);

    }
  }

}
