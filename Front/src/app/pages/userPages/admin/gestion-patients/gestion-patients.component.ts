import { Component, inject, signal } from '@angular/core';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { Patient } from '../../../../modules/types';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import QRCode from 'qrcode';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";

@Component({
  selector: 'app-gestion-patients',
  standalone: true,
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent],
  templateUrl: './gestion-patients.component.html',
  styleUrl: './gestion-patients.component.css'
})
export class GestionPatientsComponent {

  isDashBoard = signal(false);
  
  fetchServices = inject(FetchModulesService);
  listePatient = signal<Array<Patient>>([]);
  patient!: Patient;
  router = inject(Router);

  ngOnInit(): void { //when this page load, we fetch the list of patients
        
    this.fetchServices.fetchListePatient().pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe(async (liste) => {
        const listeWithQrCode = await Promise.all(
          liste.map(async (patient) => ({
           ...patient,
           qrcode: await this.generateQRCode(patient.nss), // Await each QR code generation
          }))
        );
      this.listePatient.set(listeWithQrCode);
      //this.listePatient.set(liste);
    })

    
  }

  changeDashState(){
    this.isDashBoard.update((e) => !e);
  }

  private generateQRCode(nss: number): Promise<string> {
    return QRCode.toDataURL(nss.toString()); // Returns a Base64-encoded string of the QR code
  }

  goConsult(id:number){ //aller au page pour créer un compte
    this.router.navigate(['admin/gestionPatient', id]);
  }

}