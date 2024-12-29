import { Component, inject, signal } from '@angular/core';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, FormsModule, CommonModule],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent {

  isDashBoardVisible = true;
  isCreeDPI = signal(false);
  user = inject(UserDataService).getUserData() ;  //Njibou Data te3 user te3na 

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;
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
