import { Component, inject } from '@angular/core';
import { HeaderAccueilComponent } from "../../../components/header-accueil/header-accueil.component";
//import { LoadingScreenComponent } from "../../../components/loading-screen/loading-screen.component";
//, LoadingScreenComponent

@Component({
  selector: 'app-acceuil-page',
  standalone: true,
  imports: [HeaderAccueilComponent, HeaderAccueilComponent],
  templateUrl: './acceuil-page.component.html',
  styleUrl: './acceuil-page.component.css'
})
export class AcceuilPageComponent {

}
