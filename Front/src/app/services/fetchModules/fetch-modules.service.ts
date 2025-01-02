import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient , BilanBio , BilanRadio  } from '../../modules/types';

@Injectable({
  providedIn: 'root'
})

export class FetchModulesService { //Hna yesraw les fetch functions

  http = inject(HttpClient);

  fetchListePatient(){
    const url = "http://127.0.0.1:8000/api/auth/get/admin/patient"; 
    return this.http.get<Array<Patient>>(url);
  }

  fetchListeTestsBilan(){
    const url = "http://localhost:3000/bilanMedecin"; //Json Test, not from backend
    return this.http.get(url);
  }

  fetchListeBilanRadio(dossier_id : number){
    const url = `http://127.0.0.1:8000/api/auth/get/patient/dossier/${dossier_id}/bilanRadio`;
    return this.http.get<Array<BilanRadio>>(url);
  }

  fetchListeBilanBio(dossier_id : number){
    const url = `http://127.0.0.1:8000/api/auth/get/patient/dossier/${dossier_id}/bilanbio`;
    return this.http.get<Array<BilanBio>>(url);
  }
  fetchBilanRadio( idDossier :number , idBilan:number){
    const url = `http://127.0.0.1:8000/api/auth/get/patient/dossier/${idDossier}/bilanRadio/${idBilan}`;
    return this.http.get<BilanRadio>(url);
  }
  

  fetchPatient(id:number){
    const url = `http://127.0.0.1:8000/api/auth/get/medcin/patient/${id}` ;
    return this.http.get(url);
  }
}
