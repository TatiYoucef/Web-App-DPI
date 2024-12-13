import { Component, DoCheck, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements DoCheck{

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
}
