import { Component, inject, signal } from '@angular/core';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Bilan, BilanBio, BilanRadio, Patient } from '../../../../modules/types';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import QRCode from 'qrcode';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { PostModulesService } from '../../../../services/postModules/post-modules.service';

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

  fetchServices = inject(FetchModulesService);
  postServices = inject(PostModulesService)

  listeBilan = signal<Array<Bilan>>([]);
  listeBilanBio !: Array<BilanBio>; // liste des demandes de tests pour un bilan
  listecompteRendu !: Array<BilanRadio> ;

  newBilan = {
    resultats_analytiques:[],
    typeBilan:"BIO",
    description:"",
    date_creation:""
  }

  id!: number ; //id de patient
  patient !: Patient  ;  // ! means it will surely be initialised 
  user = inject(UserDataService).getUserData(); 
  
  rout = inject(Router);
  router = inject(ActivatedRoute); //bihe njibou id fel path

  ngOnInit(): void { //when this page load, we fetch the list of patients

    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

    this.fetchServices.fetchPatient(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe(async (pat) => {
        
        const patQr = await Promise.resolve(
          {
            ...pat,
            qrcode: await this.generateQRCode(Number(pat.nss)), // Await each QR code generation
          }
        ); 
        this.patient = patQr;

        this.fetchServices.fetchListeBilanBio(this.patient.dossier).pipe( //pipe to catch any error
          catchError((err) => {
            console.log(err);
            throw err;
          })
          ).subscribe((liste) => {
    
          this.listeBilanBio = liste;
          console.log(this.listeBilanBio)
        });

        this.fetchServices.fetchListeBilanRadio(this.patient.dossier).pipe( //pipe to catch any error
          catchError((err) => {
            console.log(err);
            throw err;
          })
          ).subscribe((liste) => {
    
          this.listecompteRendu = liste;
  
        });
        
      } 
    );
    
  }

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;
  }
  
  goToBilan(idBilan:number){
    const initPath = this.user.role === 'Patient' ? 'patient':'medecin';
    this.rout.navigate([initPath,'consulter-DPI',this.id,'Bilans',idBilan]);
  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isAjoutBilan= false;
    }
    
  }

  async ajouterBilan(){

    if( !this.listeBilanBio[this.listeBilanBio.length - 1].resultats_analytiques && this.newBilan.typeBilan === "BIO" ){
      this.isAjoutBilan= false;
      alert("Bilan non crée, il existe déja un bilan biologique non rempli");
    } else {

      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' is the ISO date format (yyyy-mm-dd)
      this.newBilan.date_creation = formattedDate;

      if(this.newBilan.typeBilan === 'BIO'){

        this.postServices.createBilanBio(this.newBilan , this.patient.dossier)

        setTimeout(() => { //attendre le post soit réussi

          this.fetchServices.fetchListeBilanBio(this.patient.dossier).pipe( //pipe to catch any error
            catchError((err) => {
              console.log(err);
              throw err;
            })
            ).subscribe((liste) => {
      
            this.listeBilanBio = liste;
    
          });

        } , 1000)

      } else {

        this.postServices.createBilanRadio(this.newBilan, this.patient.dossier);
        this.fetchServices.fetchListeBilanRadio(this.patient.dossier).pipe( //pipe to catch any error
          catchError((err) => {
            console.log(err);
            throw err;
          })
          ).subscribe((liste) => {
    
          this.listecompteRendu = liste;
  
        });

      }

      this.isAjoutBilan= false;
    }

  }

  private generateQRCode(nss: number): Promise<string> {
    return QRCode.toDataURL(nss.toString()); // Returns a Base64-encoded string of the QR code
  }
    
}
