import { Component, inject, signal } from '@angular/core';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { BilanBio , BilanRadio, Patient } from '../../../../modules/types';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import QRCode from 'qrcode';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { HttpClient } from '@angular/common/http';
import { elementAt, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-bilans-liste',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, CommonModule, LoadingScreenComponent, FormsModule],
  templateUrl: './bilans-liste.component.html',
  styleUrl: './bilans-liste.component.css'
})

export class BilansListeComponent {

  isDashBoardVisible = true;
  isAjoutBilan = false;
  selectedType = "Biologique";

  fetchServices = inject(FetchModulesService);
  listeBilanRadio = signal<Array<BilanRadio>>([]);
  listeBilanBio = signal<Array<BilanBio>>([])
  bilanBio! : BilanBio;
  bilanRadio! :BilanRadio;
  id!: number ; //id de patient
  patient !: Patient  ;  // ! means it will surely be initialised 
  user = inject(UserDataService).getUserData(); 
  http = inject(HttpClient);
  rout = inject(Router);
  router = inject(ActivatedRoute); //bihe njibou id fel path

  ngOnInit(): void {
    // Step 1: Retrieve patient ID from route parameters
    this.router.paramMap.subscribe((params) => {
      this.id = Number(params.get("id")); // ID of the patient retrieved
    });
  
    const loginUrl = `http://127.0.0.1:8000/api/auth/get/medcin/patient/${this.id}`;
  
    // Step 2: Fetch patient details
    this.http.get(loginUrl).pipe(
      switchMap((response: any) => {
        console.log("Fetched user:", response.user);
  
        // Populate patient details
        this.patient = {
          idUser: response.user.id,
          id: response.user.id,
          id_DPI: response.dossier,
          nss: response.nss,
          nomUser: response.user.username,
          nom: response.user.first_name,
          prenom: response.user.last_name,
          naissance: response.date_naissance,
          adresse: response.address,
          tel: response.phone_number,
          mutuelle: response.mutuelle,
          qrcode: "9iwiti",
        };
  
        console.log("Patient DPI ID:", this.patient.id_DPI);
  
        // Step 3: Fetch dossier details using patient DPI ID
        const dossierUrl = `http://127.0.0.1:8000/api/auth/get/patient/dossier/${this.patient.id_DPI}/bilan`;
        
        
        return this.http.get(dossierUrl);
        
      }),
      catchError((error) => {
        console.error("Error in patient or dossier request:", error);
        return of([]); // Return an empty value to prevent further errors
      })
    ).subscribe({
      next: (response: any) => {
        console.log(response);
        const listeRAD = response.bilan_radiologique;
        listeRAD.forEach((element:any) => {
          
          this.bilanRadio ={
            id: element.id,
            type: element.typeBilan , //Biologique or Radiologique
            status : element.status,
            images : element.images,
            date: element.date_prescription,
            compteRendu : element.compte_rendu,
            idRadio : element.radiologue,
            medcin: element.medcin,
          }
          this.listeBilanRadio.update((currentlist)=>[...currentlist , this.bilanRadio]); 
        });

        const listeBIO = response.bilan_biologique;
        listeBIO.forEach((element :any) =>{
          this.bilanBio={
              id: element.id,
              //idMed: number;
              //idConsul: number;
              type: element.typeBilan , //Biologique or Radiologique
              status : element.status,
              date: element.date_prescription,
              idLabo : element.laborantin,
              resultats_analytiques : element.resultats_analytiques,
              medcin : element.medcin
            }
            console.log(this.bilanBio);
          this.listeBilanBio.update((currentlist) => [...currentlist , this.bilanBio])
        }) ;

        
      },
      error: (error: any) => {
        console.error("Error in subscription:", error);
      },
    });
  

   
   /* this.fetchServices.fetchListeBilanBio(this.patient?.id_DPI).pipe(
      catchError((err) => {
        console.error("Error fetching Bilan Bio list:", err);
        return of([]);
      })
    ).subscribe({
      
      next: (liste) => {
        console.log("Patient ID_DPI:", this.patient?.id_DPI);
        console.log("getting the response ");
        console.log("Fetched Bilan Bio list:", liste);
       
      },
      error: (err) => {
        console.error("Error in Bilan Bio subscription:", err);
      },
    });*/
  

    
    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

   /* this.fetchServices.fetchPatient(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe(async (pat) => {
        
        const patQr = await Promise.resolve(
          {
            ...pat,
            qrcode: await this.generateQRCode(pat.nss), // Await each QR code generation
          }
        ); 
        console.log(this.id);
        this.patient = patQr;
        
      } //fetch patient
    );*/
    
  }

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;
  }
  
  goToBilan(idBilan:number){
    this.rout.navigate(['consulter-DPI',this.id,'Bilans',idBilan]);
  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isAjoutBilan= false;
    }
    
  }

  /*ajouterBilan(){

    if( this.listeBilanRadio()[this.listeBilanRadio().length - 1].images.length === 0 ){
      this.isAjoutBilan= false;
      alert("Bilan non crée, il existe déja un bilan non rempli");
    } else {

      this.listeBilanRadio.update((liste) => {

        liste.push({
         id: 0,
         // idMed: 0,
        //  idConsul: 0,
          type: this.selectedType,
        //  rempli: false,
        //  tests:[],
          date: (Date.now()/(3600000 * 24 )).toString(),
        })

        return liste
      });

      this.isAjoutBilan= false;
    }

  }*/

  private generateQRCode(nss: number): Promise<string> {
    return QRCode.toDataURL(nss.toString()); // Returns a Base64-encoded string of the QR code
  }
    
}
