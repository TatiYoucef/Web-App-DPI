import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({ //This is the main Component, the root
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{title}}!</h1>

    <router-outlet />
  `,
  styles: [],
})

export class AppComponent {
  title = 'Front';
}
