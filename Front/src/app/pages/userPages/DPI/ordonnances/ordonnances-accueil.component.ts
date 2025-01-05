import { Component, inject, Inject, OnInit, signal } from '@angular/core'; // Importing necessary Angular modules
import { Router } from '@angular/router'; // Importing Router for navigation
import { HeaderComponent } from "../../../../components/header-user/header.component"; // Importing HeaderComponent
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component"; // Importing DashBoardComponent
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component"; // Importing LoadingScreenComponent
import { CommonModule } from '@angular/common'; // Importing CommonModule for common directives
import { FormsModule } from '@angular/forms'; // Importing FormsModule for template-driven forms
import { ActivatedRoute } from '@angular/router'; // Importing ActivatedRoute for routing parameters
import { UserDataService } from '../../../../services/userData/user-data.service'; // Importing UserDataService to fetch user data

@Component({
  selector: 'app-ordonnances-accueil', // Defining the selector for this component
  standalone: true, // Indicating that this component is standalone
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule], // Importing necessary components and modules for this component
  templateUrl: './ordonnances-accueil.component.html', // Template file for this component
  styleUrl: './ordonnances-accueil.component.css' // CSS styles for this component
})
export class OrdonnancesAccueilComponent {
  
  private route = inject(ActivatedRoute); // Injecting ActivatedRoute to access route parameters
  router = inject(Router); // Injecting Router for navigation
  isDashBoard = signal(false); // A signal for dashboard visibility state
  user = inject(UserDataService).getUserData(); // Injecting UserDataService and getting user data
  isDashBoardVisible = true; // Initial state for dashboard visibility
  isAjoutOrdonnance = false; // State for adding ordonnance
  isAjoutMedicament = false; // State for adding medicament
  duree = ""; // Variable to store duration input
  isValid = false; // Variable to store validity state
  nom = ""; // Variable to store medicament name input
  dose = ""; // Variable to store medicament dose input
  frequence = ""; // Variable to store medicament frequency input
  dateSet = Date.now(); // Storing current date and time

  ordonnances = [ // Sample ordonnance data
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
  ];

  changeDashState(){ // Function to toggle the dashboard visibility
    this.isDashBoard.update((e) => !e); // Toggle the current state of the dashboard visibility
  }

  toggleEtat(ordonnance: any): void { // Function to toggle the state of ordonnance (valid or not)
    ordonnance.etat = !ordonnance.etat; // Toggle the 'etat' of the ordonnance
    console.log('Etat changed to:', ordonnance.etat); // Log the new state
  }

  annuler(event: MouseEvent){ // Function to handle cancel action (close modal)
    // Check if the click was on the grey div or the cancel button
    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isAjoutOrdonnance= false; // Hide ordonnance add modal
      this.isAjoutMedicament= false; // Hide medicament add modal
    }
  }

  ajoutOrdonnance(){ // Function to handle adding a new ordonnance
    // Placeholder for ordonnance addition logic
  }

  ajoutMedicament(){ // Function to handle adding a new medicament
    // Placeholder for medicament addition logic
  }

}
