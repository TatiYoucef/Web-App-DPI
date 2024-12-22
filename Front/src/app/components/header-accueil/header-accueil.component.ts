import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-accueil',
  standalone: true,
  imports: [],
  templateUrl: './header-accueil.component.html',
  styleUrl: './header-accueil.component.css'
})

export class HeaderAccueilComponent {

  router= inject(Router); //Router services

  goToLogInPage(){
    this.router.navigate(["logIn"]);
  }

}
