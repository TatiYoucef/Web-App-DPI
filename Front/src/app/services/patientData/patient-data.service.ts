import { Injectable } from '@angular/core';
import { Patient } from '../../modules/types';

@Injectable({
  providedIn: 'root'
})
export class PatientDataService {  //classe 3endha ge3 les variables globales d'un patient

  private patient: Patient = {
    id: 0,
    idUser: 1,
    nomUser: "SSmith",
    nss: 3193309192,
    naissance: "01/01/2000",
    adresse: "Jijel, Jijel, Algerie",
    tel: "0540911619",
    mutuelle: "",
    nom: "Smith",
    prenom: "Sam",
  };

  getPatientData() {
    return this.patient;
  }

  setPatientData(data: Patient): void {
    this.patient = data;
  }

}
