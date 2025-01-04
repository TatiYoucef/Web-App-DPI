import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../../services/userData/user-data.service';


@Component({
  selector: 'app-ordonnances-accueil',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule],
  templateUrl: './ordonnances-accueil.component.html',
  styleUrl: './ordonnances-accueil.component.css'
})
export class OrdonnancesAccueilComponent {
  
  private route = inject(ActivatedRoute);
  router = inject(Router);
  isDashBoard = signal(false);
  user = inject(UserDataService).getUserData();
  isDashBoardVisible = true;
  isAjoutOrdonnance = false;
  isAjoutMedicament = false;
  duree = "";
  isValid = false;
  nom = "";
  dose = "";
  frequence = "";
  dateSet = Date.now();

  ordonnances = [
    {
      "id": 23,
      "id_DPI": 12,
      "dateCreation": "2024-12-11",
      "duree": "5 jours",
      "etat": true,
      "medicaments": [
        {
          "id": 34,
          "id_ordonnance": 23,
          "nom": "Salbutamol",
          "dose": "2 inhalations",
          "frequence": "au besoin"
        }
      ]
    },
    {
      "id": 24,
      "id_DPI": 12,
      "dateCreation": "2024-12-13",
      "duree": "10 jours",
      "etat": false,
      "medicaments": [
        {
          "id": 35,
          "id_ordonnance": 24,
          "nom": "Montélukast",
          "dose": "10mg",
          "frequence": "1 fois par jour"
        },
        {
          "id": 36,
          "id_ordonnance": 24,
          "nom": "Fluticasone",
          "dose": "2 inhalations",
          "frequence": "2 fois par jour"
        }
      ]
    }
  ]
  changeDashState(){
    this.isDashBoard.update((e) => !e);
  }

  toggleEtat(ordonnance: any): void {
    ordonnance.etat = !ordonnance.etat;
    console.log('Etat changed to:', ordonnance.etat);
  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isAjoutOrdonnance= false;
      this.isAjoutMedicament= false;
    }
    
  }
  ajoutOrdonnance(){

  }

  ajoutMedicament(){
    
  }

}
