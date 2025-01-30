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

  // Signal pour indiquer si le tableau de bord est visible
  isDashBoard = signal(true);
  router = inject(Router);

  // Récupération des informations de l'utilisateur courant
  userServices = inject(UserDataService);
  user = this.userServices.getUserData();

  // Fonction pour naviguer vers la page de déconnexion
  goToDisconnect() {

    this.userServices.setUserData({
      id: 0,
      first_name: "???",
      last_name: "???",
      username: "???",
      email: "???",
      role: "???",
    })

    this.router.navigate([""]);
  }

  // Met à jour la visibilité du tableau de bord
  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoard.set(isVisible);
  }

  // Navigation vers la page d'accueil en fonction du rôle de l'utilisateur
  goToHome() {
    switch (this.user.role) {

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
