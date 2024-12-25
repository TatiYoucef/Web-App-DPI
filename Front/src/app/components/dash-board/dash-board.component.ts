import { Component, inject } from '@angular/core';
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

  router = inject(Router);

  user= inject(UserDataService).getUserData();

  goToDisconnect(){
    this.router.navigate([""]);
  }

}
