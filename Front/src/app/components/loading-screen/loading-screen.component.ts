import { Component } from '@angular/core'; // Import the Component decorator from Angular core

@Component({
  selector: 'app-loading-screen', // The HTML tag for the component
  standalone: true, // Marks this component as standalone, not requiring an Angular module
  imports: [], // Empty imports array, no additional modules are imported for this component
  templateUrl: './loading-screen.component.html', // The path to the component's HTML template
  styleUrl: './loading-screen.component.css' // The path to the component's CSS styles
})
export class LoadingScreenComponent { // Define the class for the component
  // Currently, this component has no logic or properties
}
