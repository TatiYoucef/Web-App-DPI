import { Component, inject } from '@angular/core'; // Import necessary Angular core functionalities
import { Router } from '@angular/router'; // Import Angular Router for navigation

@Component({
  selector: 'app-header-accueil', // Selector to identify the component in HTML
  standalone: true, // Indicates that the component is standalone and not part of a module
  imports: [], // Placeholder for any module imports (currently none)
  templateUrl: './header-accueil.component.html', // Path to the component's HTML template
  styleUrl: './header-accueil.component.css' // Path to the component's CSS styles
})

export class HeaderAccueilComponent {

  router = inject(Router); // Injecting the Router service to enable navigation

  goToLogInPage() {
    this.router.navigate(["logIn"]); // Method to navigate to the 'logIn' page
  }

}
