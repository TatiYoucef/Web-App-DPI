import { Component, DoCheck, EventEmitter, inject, Output, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements DoCheck{

  isDashBoard = signal(false);
  @Output() changeDashEvent = new EventEmitter<boolean>();

  router= inject(Router); //Router services

  isAcceuilPage = signal(true);
  isNotiPage = signal(false); //ida True rana fe notification, header yetbeddel chwiya

  ngDoCheck(): void { //this functions executes for each change happens in browser
    if(this.router.url.includes("notif")) this.isNotiPage.set(true); //si on est fe notification
    else this.isNotiPage.set(false); //sinon
  }

  goToNotifications(){ //bouton de notification si cliqué
    this.router.navigate(["/notif"]);
  }

  changeDashState(){
    this.isDashBoard.update((e) => !e);
    this.changeDashEvent.emit(this.isDashBoard()); //Child is telling that its boolean changed !!!
  }

}
