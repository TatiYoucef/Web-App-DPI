import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { Patient } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common';
import { UpdateModulesService } from '../../../../services/updateModules/update-modules.service';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})

export class AddAccountComponent {

  isDashBoardVisible = true;

  id!: number; //id de patient li ra7 necryyoulou compte
  idA!: number; //id de Admin
  router = inject(ActivatedRoute); //bihe njibou id fel path
  routing = inject(Router);

  patient!:Patient;
  fetchServices = inject(FetchModulesService);
  updateServices = inject(UpdateModulesService);

  ngOnInit(): void {

    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
      this.idA =Number(params.get("idA")); //id de Admin récupéré
    });

    console.log(this.id);

    this.fetchServices.fetchPatient(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((pat: any) => {

      this.patient = pat;
    })
      
  }
    
  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  creerCompte(username:String, password:String){

    if(!username || password.length < 8 ){ 

      alert("Veuillez remplir tous les informations, mot de passe doit dépasser 8 caractères")
    
    }else{

      this.updateServices.updatePatientAccount(username, password, this.patient.id).subscribe({
        next: (response:any)=>{
          console.log(response.user) 
          this.routing.navigate(['admin', this.idA, 'gestionPatient']);
        },

        error : (error: any) =>{
          console.error('Error fetching patient:', error);
        }

      })

        
     
    }

  }

}
