import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})

export class AcceuilPageComponent {

  isDashBoardVisible = true;
  user = inject(UserDataService).getUserData() //Njibou Data te3 user te3na

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }
}
