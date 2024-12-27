import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../../services/userData/user-data.service';

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent {

  isDashBoard = signal(false);
  user = inject(UserDataService).getUserData() || {
    id: 0,
    nom: "N/A",
    prenom: "N/A",
    nomUser: "N/A",
    naissance: "N/A",
    role: "Patient",
  } ; //Njibou Data te3 user te3na , hadik || besh lina 7na ida bghina ndesigniw bla manlogiw à chaque fois

  changeDashState(){
    this.isDashBoard.update((e) => !e);
  }
}
