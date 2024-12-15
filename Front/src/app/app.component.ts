import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAccueilComponent } from './components/header-accueil/header-accueil.component';

@Component({ //This is the main Component, the root
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `

    <main>
      <router-outlet />
    </main>
    
  `,
  styles: [],
})

export class AppComponent {
  title = 'Front';
}
