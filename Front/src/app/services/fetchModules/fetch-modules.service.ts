import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Bilan, BilanBio, BilanRadio, Consultation, Patient } from '../../modules/types';
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

  fetchListePatientHospitalised(){ //pour que Infirmier / radiologue / labo puissent les traiter
    const url = "http://127.0.0.1:8000/api/auth/get/rabLabInf/patient";
    return this.http.get<Array<Patient>>(url);
  }

  fetchListePatientSansCompte(){ //pour que admin les ajoutent un compte
    const url = "http://127.0.0.1:8000/api/auth/get/admin/patient"; //from backend
    return this.http.get<Array<Patient>>(url);
  }

  fetchPatient( id:number ){ //fetch patient with id Patient
    const url = `http://127.0.0.1:8000/api/auth/get/medcin/patient/${id}`;
    return this.http.get<Patient>(url);
  }

  fetchPatientNss(nss: number){
    const url = `http://127.0.0.1:8000/api/auth/get/patient/${nss}`;
    return this.http.get<Patient>(url);
  }

  fetchListeDPIs(){
    const url = "http://localhost:3000/DPIs"; //Json Test, not from backend
    return this.http.get<Array<DPI>>(url);
  }
  
  fetchDPI(idPatient: number){
    const url = `http://127.0.0.1:8000/api/auth/register/medcin/patients/${idPatient}/dpi`; // From backend
    return this.http.get<{ dossier: any; patient: any }>(url); 
  }

  fetchListeBilan(){
    const url = `http://127.0.0.1:8000/api/auth/post/rabLabInf/patient/incBilanBio`;
    return this.http.get<Array<Bilan>>(url);
  }

  fetchBilan(id:number){
    const url = "http://localhost:3000/Bilans"; //Json Test, not from backend
    return this.http.get<Bilan>(url);
  }

  fetchListeBilanBioIncompleted(id:number){ //liste des bilans bios non rempli pour rabLabInf de id de patient
    const url = `http://127.0.0.1:8000/api/auth/get/rabLabInf/patient/${id}/incBilanBio`;
    return this.http.get<Array<BilanBio>>(url);
  }

  fetchListeBilanRadioIncompleted(id:number){ //liste des bilans radio non rempli pour rabLabInf de id de patient
    const url = `http://127.0.0.1:8000/api/auth/get/rabLabInf/patient/${id}/incBilanRadio`;
    return this.http.get<Array<BilanRadio>>(url);
  }

  fetchBilanBio(id:number){
    const url = `http://localhost:3000/listeBilan/${id}`;
    return this.http.get<BilanBio>(url);
  }

  fetchBilanRadio(id:number){
    const url = `http://localhost:3000/listeBilan/${id}`;
    return this.http.get<BilanBio>(url);
  }
  
  fetchListeOrdonnances(){
    const url = "http://localhost:3000/DPIs"; //Json Test, not from backend
    return this.http.get(url);
  }

  fetchConsultations(idPatient: number){
    const url = `http://127.0.0.1:8000/api/auth/register/medcin/patients/${idPatient}/dpi/consultations`; // From backend
    return this.http.get<Array<Consultation>>(url);
  }


}
