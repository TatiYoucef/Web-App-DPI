import { Component } from '@angular/core';
import { HeaderAccueilComponent } from "../../../components/header-accueil/header-accueil.component";

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderAccueilComponent , HeaderAccueilComponent],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})
export class AcceuilPageComponent {

}
