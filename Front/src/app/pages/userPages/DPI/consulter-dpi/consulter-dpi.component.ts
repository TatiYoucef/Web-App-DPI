import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { ActivatedRoute, Router } from '@angular/router';
import { DPI2, Patient2 } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consulter-dpi',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './consulter-dpi.component.html',
  styleUrl: './consulter-dpi.component.css',
  providers: [DatePipe]
})

export class ConsulterDPIComponent implements OnInit{

  isDashBoardVisible = true;

  fetchServices = inject(FetchModulesService);
  id!: number ; //id de patient
  patient !: Patient2  ;  // ! means it will surely be initialised  
  dossier !: DPI2 ;
  user = inject(UserDataService).getUserData() ;  //Njibou Data te3 user te3na 

  router = inject(ActivatedRoute); //bihe njibou id fel path
  navigation = inject(Router);

  ngOnInit(): void {

    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

    this.fetchServices.fetchDPI(this.id)
    .pipe(
      // Use catchError to handle errors
      catchError((err) => {
        console.error('Error fetching DPI:', err);
        // Optionally rethrow or handle the error
        throw err;
      })
    )
    
    .subscribe((response) => {
      // Extract the dossier and patient from the response
      this.dossier = response.dossier; // Assign dossier to this.dossier
      this.patient = response.patient; // Optionally handle patient if needed
      console.log('Dossier:', this.dossier);
      console.log('Patient:', this.patient);
    });

    if(this.id === 14){ //just a test
      console.log(`same decryption on colors down here:>>\n\n=\\i$F;FM^,:EW"u:JXb^;ahg*:JXVT74]QQ+@AFi:/=h37R]a>+@/b*+Abs3<CB8R/0IM,Eb/ZqCj@.5@;[H7+Dbt>AKZ8:FWb75Dfo]+/0K4VFWb1&DBO%0CLnW0D..6s+ED%7F<G%(AoD^$+Cf>-FD5W8ASu4"B.beh$49IFDegJ(F<G[=BlbD>EbmcDBQS?8F#ks-GB\\6\`Anbmp@4l&.D(fF2F(o9)0/$7;@;od0De:S7ARTV$5AkCMAM%V,4Y\\ND2C<N/A9)TB6Vg?UD(nk/2/6Yp/MRS>@V'Y*AS#a%FD,5.FE_XGF)59+BOu6-Bl5%;/hSbeATMQuDD*YABOPjk/hSb#+DGm>@3BE$F)u&5B-;/-ARf9oFD,*)+DGm>@VKp,@rc!p@VfUd+EVNEE,oN'BleB7EbT#lC\`me4@;od=$48IA0eb:80eb:F5%eGK9OW!a;e:&!.6K^H0JP780JP780JP790JP780Kq[>Df9E*AO^*O:3CD%.6K^I0JG170ek@90JG170ek@:0ek@:0JG180JG180JG480eb:90ek@:0eb:95!EUjFAlam-o3;74>AND0eb=90ek@90ek@90eb=90ek@90eb:80ek@:0JP780JP:90JG480eb=90JG480eb=:0JG170eb:80JG480eb=90JG480JP::0JG480ek@90eb<h$=\\."+EMI<AKYr+ARf:m+CT;%+Dkh6F(oN)+EV:8/0Je<H"(>-@V'%XF\`V+:Blk_D+CQB:AoD^&Dfg)4DBO%>E+rf++?p3HBl8#R+D5P"Bl"o*@<3Q"+D5V2A0?))Gp%3I+E2@4F(KB8AKYr4ARfFmF\`S[6EarcsG%G_I+9`);
    }

  }

  isInformationsPatient = signal(false); //si on clique 3la infos patients tweli vrai
  isAntecedentPatient = signal(false);

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isInformationsPatient.set(false);
      this.isAntecedentPatient.set(false);
    }
    
  }

  informationsPatient(){
    console.log("Consultation des informations du patient.");
  }

  mettreAjourAntecedent(){
    console.log("Antecedents patché...");
  }

  // Navigate to the consultations page
  viewConsultations() {
   
    this.navigation.navigate([this.user.role === 'Patient' ? 'patient':'medecin' , 'consulter-DPI', this.id,'consultations']);
  }

}
