import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({ //This is the main Component, the root
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `

    <main>
      <router-outlet />
    </main>
    
  `,
})

export class AppComponent {
  title = 'Front';
}
