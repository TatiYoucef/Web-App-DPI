import { Component, inject, signal } from '@angular/core';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import { Bilan, Patient } from '../../../../modules/types';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { CommonModule } from '@angular/common';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import QRCode from 'qrcode';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../../../../services/userData/user-data.service';

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
  listeBilan = signal<Array<Bilan>>([]);

  id!: number ; //id de patient
  patient !: Patient  ;  // ! means it will surely be initialised 
  user = inject(UserDataService).getUserData(); 
  
  rout = inject(Router);
  router = inject(ActivatedRoute); //bihe njibou id fel path

  ngOnInit(): void { //when this page load, we fetch the list of patients
      
    this.fetchServices.fetchListeBilan().pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe(async (liste) => {this.listeBilan.set(liste)} //fetch liste des bilans
    );

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
            qrcode: await this.generateQRCode(pat.nss), // Await each QR code generation
          }
        ); 
        console.log(this.id);
        this.patient = patQr;
        
      } //fetch patient
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

  ajouterBilan(){

    if( this.listeBilan()[this.listeBilan().length - 1].tests.length === 0 ){
      this.isAjoutBilan= false;
      alert("Bilan non crée, il existe déja un bilan non rempli");
    } else {

      this.listeBilan.update((liste) => {

        liste.push({
          id: 0,
          idMed: 0,
          idConsul: 0,
          type: this.selectedType,
          rempli: false,
          tests:[],
          date: (Date.now()/(3600000 * 24 )).toString(),
        })

        return liste
      });

      this.isAjoutBilan= false;
    }

  }

  private generateQRCode(nss: number): Promise<string> {
    return QRCode.toDataURL(nss.toString()); // Returns a Base64-encoded string of the QR code
  }
    
}
