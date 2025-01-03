import { Component, inject, OnInit, signal } from '@angular/core';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent implements OnInit{

  isDashBoardVisible = true;
  isCreeDPI = signal(false);
  user = inject(UserDataService).getUserData() ;  //Njibou Data te3 user te3na 
  id!:number;

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;
  }

  ngOnInit(): void {

    const rout = inject(ActivatedRoute);
    rout.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); //id de user récupéré
    });

  }

  creerDPI(){
    console.log("Créer DPI en cours de traitement...")
  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || 
      (event.target as HTMLElement).classList.contains('annuler') ) {

      this.isCreeDPI.set(false);

    }
  }

  nssInput = '';

}
