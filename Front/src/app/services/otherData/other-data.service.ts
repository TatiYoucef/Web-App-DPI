import { Injectable } from '@angular/core';
import { Ordonnance } from '../../modules/types';
import { Medicament } from '../../modules/types';



@Injectable({
  providedIn: 'root'
})
export class OtherDataService {

  private ordonnance1 : Ordonnance = {
    id : 1,
    dateCreation : "01/10/2024",
    duree : "15 jours",
    etat : false,
    medicaments : null,
  };

  private ordonnance2 : Ordonnance = {
    id : 2,
    dateCreation : "11/12/2024",
    duree : "7 jours",
    etat : true,
    medicaments : null,
  };

  private medicament1 : Medicament = {
    nom : "Amoclan",
    dose : "10",
    frequence : "1 fois par jour",
  };

  private medicament2 : Medicament = {
    nom : "Doliprane",
    dose : "6",
    frequence : "2 fois par jour",
  };

  private medicament3 : Medicament = {
    nom : "Therafresh",
    dose : "12",
    frequence : "3 fois par jour",
  };



  getOrdonnanceData(){
    this.ordonnance1.medicaments?.push(this.medicament1);
    this.ordonnance1.medicaments?.push(this.medicament2);
    this.ordonnance1.medicaments?.push(this.medicament3);
    this.ordonnance2.medicaments?.push(this.medicament2);
    this.ordonnance2.medicaments?.push(this.medicament1);
    this.ordonnance2.medicaments?.push(this.medicament3);


    return [this.ordonnance2, this.ordonnance1];
  }

  constructor() { }
}
