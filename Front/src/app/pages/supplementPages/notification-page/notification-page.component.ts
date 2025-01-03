import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification-page',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './notification-page.component.html',
  styleUrl: './notification-page.component.css'
})
export class NotificationPageComponent {

  isDashBoardVisible = true;

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;
  }

}
