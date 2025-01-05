import { Component } from '@angular/core'; // Importing Component from Angular core
import { RouterOutlet } from '@angular/router'; // Importing RouterOutlet for handling routes

@Component({ // This is the main Component, the root of the application
  selector: 'app-root', // The selector that represents this component in the HTML
  standalone: true, // Indicates that this component is standalone and not dependent on others
  imports: [RouterOutlet], // Importing RouterOutlet to enable routing
  template: `

    <main> 
      <router-outlet /> <!-- This is where routed components will be rendered -->
    </main>
    
  `,
})

export class AppComponent {
  title = 'Front'; // Defining the title for this component
}
