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


@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderComponent,DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule ],
  schemas: [NO_ERRORS_SCHEMA],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent implements OnInit{

  isDashBoard = signal(false);

  fetchServices = inject(FetchModulesService);
  listePatient = signal<Array<Patient>>([]);

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
  
}
