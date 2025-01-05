import { Component, inject, OnInit } from '@angular/core';
import { Bilan, TestBilan } from '../../../../modules/types';
import { ActivatedRoute } from '@angular/router';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../../../services/userData/user-data.service';

@Component({
  selector: 'app-consulter-bilan',
  standalone: true,
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, FormsModule, CommonModule ],
  templateUrl: './consulter-bilan.component.html',
  styleUrl: './consulter-bilan.component.css'
})

export class ConsulterBilanComponent implements OnInit{

  isDashBoardVisible = true;

  fetchServices = inject(FetchModulesService);
  idPatient!:number ; //id patient
  idBilan!:number ; //id bilan
  bilan!:any;
  user = inject(UserDataService).getUserData();

  router = inject(ActivatedRoute); //bihe njibou id fel path
  
  ngOnInit(): void {

    this.router.paramMap.subscribe((params) =>{
      this.idPatient =Number(params.get("id1")); //id de patient récupéré
      this.idBilan =Number(params.get("id2")); //id de bilan récupéré
    });

    this.fetchServices.fetchDPI(this.idBilan).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((bil) => {

      this.bilan = bil; //fetch bilan

      if(this.bilan.tests.length === 0){
        this.bilan.tests.push({
          id:this.bilan.tests.length,
          testName:'',
          result:null
        })
      }

    });
    

  }

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;
  }

  addTest(){

    this.bilan.tests.push({
      id:this.bilan.tests.length,
      testName:'',
      result:null
    })

  }

  removeTest(index:number){

    this.bilan.tests.splice(index, 1);

  }

  patchBilan(){
    console.log("Bilan updated to", this.bilan);
  }
}
