import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient } from '../../modules/types';
import { DPI } from '../../modules/types';
@Injectable({
  providedIn: 'root'
})

export class FetchModulesService { //Hna yesraw les fetch functions

  http = inject(HttpClient);

  fetchListePatient(){
    const url = "http://localhost:3000/patients"; //Json Test, not from backend
    return this.http.get<Array<Patient>>(url);
  }

  fetchPatient( id:number ){ //fetch patient with id Patient
    const url = `http://localhost:3000/patients/${id}`;
    return this.http.get<Patient>(url);
  }

  fetchListeTestsBilan(){
    const url = "http://localhost:3000/bilanMedecin"; //Json Test, not from backend
    return this.http.get(url);
  }

  fetchListeDPIs(){
    const url = "http://localhost:3000/DPIs"; //Json Test, not from backend
    return this.http.get<Array<DPI>>(url);
  }

  fetchDPI(idPatient: number){
    const url = `http://localhost:3000/DPIs/${idPatient}`; //Json Test, not from backend
    return this.http.get<DPI>(url);
  }
  
  fetchListeOrdonnances(){
    const url = "http://localhost:3000/DPIs"; //Json Test, not from backend
    return this.http.get(url);
  }


}
