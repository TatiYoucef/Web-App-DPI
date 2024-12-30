import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { Patient } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent],
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})

export class AddAccountComponent {

  isDashBoard = signal(false);

  id!: number; //id de patient li ra7 necryyoulou compte
  router = inject(ActivatedRoute); //bihe njibou id fel path

  patient!:Patient;
  fetchServices = inject(FetchModulesService);

  ngOnInit(): void {

    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

    console.log(this.id);

   /* this.fetchServices.fetchPatient(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((pat: any) => {

      this.patient = pat;
    })*/
      
  }
    
  updateDashboardVisibility(V:boolean){
    this.isDashBoard.set(V);
  }

  creerCompte(username:String, password:String){
    console.log(username, "\n", password);
  }

}
