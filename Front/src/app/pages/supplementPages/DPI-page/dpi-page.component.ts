import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../services/userData/user-data.service';

@Component({
  selector: 'app-dpi-page',
  standalone: true,
  imports: [],
  templateUrl: './dpi-page.component.html',
  styleUrl: './dpi-page.component.css'
})
export class DPIPageComponent {

}