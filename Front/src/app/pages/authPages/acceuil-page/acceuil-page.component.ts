// Importing necessary modules and components from Angular
import { Component, inject } from '@angular/core';
// Importing the HeaderAccueilComponent to be used in the template
import { HeaderAccueilComponent } from "../../../components/header-accueil/header-accueil.component";
// The LoadingScreenComponent is imported but commented out, indicating it's not being used currently
// import { LoadingScreenComponent } from "../../../components/loading-screen/loading-screen.component";

// Defining the Angular component for the accueil (home) page
@Component({
  selector: 'app-acceuil-page', // The selector for this component
  standalone: true, // This component is a standalone component and does not depend on other components
  imports: [HeaderAccueilComponent, HeaderAccueilComponent], // Importing the HeaderAccueilComponent twice (likely a mistake, should only be imported once)
  templateUrl: './acceuil-page.component.html', // The path to the HTML template for the component
  styleUrl: './acceuil-page.component.css' // The path to the CSS file for the component
})
export class AcceuilPageComponent {
  // The component logic can be added here in the future, currently empty
}
