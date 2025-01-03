import { Component, EventEmitter, inject, Output, signal, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/userData/user-data.service';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})

export class DashBoardComponent {

  isDashBoard = signal(true);  // Dashboard is visible by default on larger screens
  router = inject(Router);

  user= inject(UserDataService).getUserData();

  goToDisconnect(){
    this.router.navigate([""]);
  }

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoard.set(isVisible);
  }

  goToHome(){

    switch(this.user.role){

      case "Administratif":
        this.router.navigate(['admin', this.user.id]);
      break;

      case "Medcin":
        this.router.navigate(['medecin', this.user.id]);
      break;

      case "Patient":
        this.router.navigate([`patient/consulter-DPI/${this.user.id}`]);
      break;

      default: //rablabinf
        this.router.navigate(['rabLabInf',this.user.id]);

      
    }

  }

}
