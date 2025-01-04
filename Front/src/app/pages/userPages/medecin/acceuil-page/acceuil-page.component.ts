import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { Patient } from '../../../../modules/types';
import { DPI } from '../../../../modules/types';
import { catchError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModulesService } from '../../../../services/postModules/post-modules.service';

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule, ZXingScannerModule],
  templateUrl: './acceuil-page.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent implements OnInit {

  isDashBoardVisible = true;
  id!:number;
  rout = inject(ActivatedRoute);
  router = inject(Router);

  postServices = inject(PostModulesService);
  fetchServices = inject(FetchModulesService);

  user = inject(UserDataService).getUserData() ;  //Njibou Data te3 user te3na 
  isCreeDPI = signal(false);
  isRecherchePatient = signal(false); //si on clique 3la recherche wella créer, ywellou vrai

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  ngOnInit(): void { //when this page load, we fetch the list of patients

    this.rout.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); //id de medecin récupéré
    });

    
  }

  nssInput = '';
  isScanning = false;

  onScanSuccess(result: string) { //Si QrScan est réussi
    console.log('QR Code scanned: ', result);

    if(isNaN(Number(result))){ //ida meshi un nombre NSS, no
      alert("Veuillez scanner un nombre entier de nss de patient");
      this.isRecherchePatient.set(false);
    } else{
      this.nssInput = result;
      this.recherchePatient();
    }

  }

  onScanFailure(error: any) {
    console.error('Scan failed: ', error);
  }

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
    nss: this.nssInput,
    mutuelle: "",
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

  recherchePatient(){ //searchPatient and navigate to its DPI

    if(isNaN(Number(this.nssInput))){ //ida meshi un nombre NSS, no
      alert("Veuillez scanner un nombre entier de nss de patient");
      this.isRecherchePatient.set(false);
    } else {

      this.fetchServices.fetchPatientNss(Number(this.nssInput)).pipe( //pipe to catch any error
        catchError((err) => {
          console.log(err);
          alert("Nss saisie est erroné, veillez resaisir");
          this.isRecherchePatient.set(false);
          this.nssInput = "";
          throw err;
        })
        ).subscribe(async (patient) => { //patient fetched !!! navigating to its page
          this.router.navigate(['medecin/consulter-DPI', patient.id]);
      })

    }

  }

  annulerRecherche(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isCreeDPI.set(false);
      this.isRecherchePatient.set(false);
    }
    
  }

}
