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

@Component({
  selector: 'app-bilans-liste',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, CommonModule, LoadingScreenComponent],
  templateUrl: './bilans-liste.component.html',
  styleUrl: './bilans-liste.component.css'
})

export class BilansListeComponent {

  isDashBoardVisible = true;

  fetchServices = inject(FetchModulesService);
  listeBilan = signal<Array<Bilan>>([]);

  id!: number ; //id de patient
  patient !: Patient  ;  // ! means it will surely be initialised  
  
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
    this.rout.navigate(['consulter-DPI',this.id,'Bilans',idBilan]);
  }

  private generateQRCode(nss: number): Promise<string> {
    return QRCode.toDataURL(nss.toString()); // Returns a Base64-encoded string of the QR code
  }
    
}
