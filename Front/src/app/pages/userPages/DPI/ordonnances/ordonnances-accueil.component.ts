import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ordonnances-accueil',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule],
  templateUrl: './ordonnances-accueil.component.html',
  styleUrls: ['./ordonnances-accueil.component.css']
})
export class OrdonnancesAccueilComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient); // Inject HttpClient for API communication
  router = inject(Router);

  isDashBoard = signal(false);
  isDashBoardVisible = true;
  isAjoutOrdonnance = false;
  isAjoutMedicament = false;

  // Form inputs
  duree = "";
  isValid = false;
  nom = "";
  dose = "";
  frequence = "";
  medicaments: any[] = [];
  ordonnances: any[] = [];
  selectedOrdonnance: any = null;

  ngOnInit() {
    
    this.fetchOrdonnances();
  }

  // Toggle dashboard visibility
  changeDashState() {
    this.isDashBoard.update((e) => !e);
  }

  // Fetch ordonnances from the backend
  fetchOrdonnances() {
    this.http.get<any[]>('/api/ordonnances/').subscribe(
      (data) => {
        this.ordonnances = data;
        console.log('Ordonnances fetched:', this.ordonnances);
      },
      (error) => {
        console.error('Error fetching ordonnances:', error);
      }
    );
  }

  ajoutOrdonnance() {
    const newOrdonnance = {
      duree: this.duree,
      etat: this.isValid,
      medicaments: this.medicaments.map((med) => ({
        nom: med.nom,
        dose: med.dose,
        frequence: med.frequence
      }))
    };
    const apiUrl = 'http://127.0.0.1:8000/api/auth/get/patient/dossier/${id_dossier}/ordonnance' ;

    this.http.post(apiUrl, newOrdonnance).subscribe(
      (data) => {
        console.log('Ordonnance added:', data);
        this.fetchOrdonnances();
        this.isAjoutOrdonnance = false;
      },
      (error) => {
        console.error('Error adding ordonnance:', error);
      }
    );
  }

  // Toggle the state of an ordonnance
  toggleEtat(ordonnance: any) {
    const updatedOrdonnance = { ...ordonnance, etat: !ordonnance.etat };
    this.http.put(`/api/ordonnances/${ordonnance.id}/`, updatedOrdonnance).subscribe(
      (data) => {
        console.log('Ordonnance updated:', data);
        this.fetchOrdonnances(); // Refresh the list of ordonnances
      },
      (error) => {
        console.error('Error updating ordonnance:', error);
      }
    );
  }

  annuler(event: MouseEvent) {
    if (
      (event.target as HTMLElement).classList.contains('grey-div') ||
      (event.target as HTMLElement).classList.contains('annuler')
    ) {
      this.isAjoutOrdonnance = false;
      this.isAjoutMedicament = false;
    }
  }

  ajoutMedicament() {
    this.medicaments.push({ nom: this.nom, dose: this.dose, frequence: this.frequence });
    console.log('Medicament added:', this.medicaments);
    this.nom = '';
    this.dose = '';
    this.frequence = '';
  }

  supprimerMedicament(index: number) {
    this.medicaments.splice(index, 1);
  }
}
