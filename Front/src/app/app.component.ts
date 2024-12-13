import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";

@Component({ //This is the main Component, the root
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `

    <app-header />
    <main>
      <router-outlet />
    </main>
    
  `,
  styles: [],
})

export class AppComponent {
  title = 'Front';
}
