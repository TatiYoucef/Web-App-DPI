import { Component, inject, OnInit, signal } from '@angular/core';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { Patient } from '../../../../modules/types';
import { catchError } from 'rxjs';
import { HeaderComponent } from "../../../../components/header/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent],
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
      ).subscribe((liste) => {
      this.listePatient.set(liste);
    })
  }

  changeDashState(){
    this.isDashBoard.update((e) => !e);
  }
  
}
