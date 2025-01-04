import { Component, inject, signal } from '@angular/core';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { Patient } from '../../../../modules/types';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError } from 'rxjs';
import QRCode from 'qrcode';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../../../services/userData/user-data.service';

@Component({
  selector: 'app-gestion-patients',
  standalone: true,
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, CommonModule],
  templateUrl: './gestion-patients.component.html',
  styleUrl: './gestion-patients.component.css'
})
export class GestionPatientsComponent {

  isDashBoardVisible = true;
  
  fetchServices = inject(FetchModulesService);
  listePatient = signal<Array<Patient>>([]);
  user = inject(UserDataService).getUserData();
  id!:number;

  router = inject(Router);
  rout = inject(ActivatedRoute);


  ngOnInit(): void { //when this page load, we fetch the list of patients
        
    this.fetchServices.fetchListePatientSansCompte().pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe(async (liste) => {
        const listeWithQrCode = await Promise.all(
          liste.map(async (patient) => ({
            ...patient,
            qrcode: await this.generateQRCode(Number(patient.nss)), // Await each QR code generation
          }))
        );
      this.listePatient.set(listeWithQrCode);
      //this.listePatient.set(liste);
    })

    this.rout.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); //id de patient récupéré
    });

    
  }

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  private generateQRCode(nss: number): Promise<string> {
    return QRCode.toDataURL(nss.toString()); // Returns a Base64-encoded string of the QR code
  }

  goConsult(id:number){ //aller au page pour créer un compte
    this.router.navigate(['admin',this.user.id,'gestionPatient', id]);
  }

}