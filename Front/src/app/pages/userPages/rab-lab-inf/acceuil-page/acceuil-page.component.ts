import { Component, inject, NO_ERRORS_SCHEMA, OnInit, signal } from '@angular/core';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { Patient } from '../../../../modules/types';
import { catchError } from 'rxjs';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import QRCode from 'qrcode';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../../../services/userData/user-data.service';


@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderComponent,DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent implements OnInit{

  isDashBoardVisible = true;

  fetchServices = inject(FetchModulesService);
  listePatient = signal<Array<Patient>>([]);

  id!:number;

  router = inject(Router);
  user = inject(UserDataService).getUserData();

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
            qrcode: await this.generateQRCode(Number(patient.nss)), // Await each QR code generation
          }))
        );
      this.listePatient.set(listeWithQrCode);
      //this.listePatient.set(liste);
    })

    const rout = inject(ActivatedRoute);
    rout.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); //id de patient récupéré
    });

    
  }

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  goConsult(id:number){
    
    if(this.user.role === "Infermier"){
      this.router.navigate([`rabLabInf/${this.user.id}/ajoutSoin/`, id]);
    } else {
      this.router.navigate([`rabLabInf/${this.user.id}/joindreBilan/`, id]);
    }

  }

  private generateQRCode(nss: number): Promise<string> {
    return QRCode.toDataURL(nss.toString()); // Returns a Base64-encoded string of the QR code
  }
  
}
