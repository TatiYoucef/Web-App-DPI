import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common'; 
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';

@Component({
  selector: 'app-ordonnances-accueil',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],
  templateUrl: './ordonnances-accueil.component.html',
  styleUrl: './ordonnances-accueil.component.css'
})
export class OrdonnancesAccueilComponent {

  isDashBoard = signal(false);
  changeDashState(){
    this.isDashBoard.update((e) => !e);
  }

  router = inject(Router);

}
