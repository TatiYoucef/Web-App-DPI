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
  user = inject(UserDataService).getUserData() //Njibou Data te3 user te3na

  changeDashState(){
    this.isDashBoard.update((e) => !e);
  }
}
