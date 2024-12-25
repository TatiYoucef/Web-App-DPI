import { Component, DoCheck, EventEmitter, inject, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../services/userData/user-data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  isDashBoard = signal(false);
  @Output() changeDashEvent = new EventEmitter<boolean>();

  router= inject(Router); //Router services
  user = inject(UserDataService).getUserData() ; //Njibou Data te3 user te3na

  isNotiPage = signal(false);

  goToNotifications(){ //bouton de notification si cliqué
    this.router.navigate(["/notif"]);
  }

  changeDashState(){
    this.isDashBoard.update((e) => !e);
    this.changeDashEvent.emit(this.isDashBoard()); //Child is telling that its boolean changed !!!
  }

}
