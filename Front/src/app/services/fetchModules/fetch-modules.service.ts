import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BilanBio, BilanRadio, Consultation, Ordonnance, Patient, Soin } from '../../modules/types';
import { DPI } from '../../modules/types';

@Injectable({
  providedIn: 'root'
})

export class FetchModulesService { //Hna yesraw les fetch functions

  http = inject(HttpClient);

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
  
  fetchDPI(idDossier: number){
    const url = `http://127.0.0.1:8000/api/auth/get/patient/dossier/${idDossier}`; // From backend
    return this.http.get<DPI>(url); 
  }

  fetchListeBilanBio(idDossier:number){ 
    const url = `http://127.0.0.1:8000/api/auth/get/patient/dossier/${idDossier}/bilanbio`;
    return this.http.get<Array<BilanBio>>(url);
  }

  fetchBilanBio(id:number){
    const url = `http://127.0.0.1:8000/api/auth/get/patient/dossier/bilanBio/${id}`;
    return this.http.get<BilanBio>(url);
  }

  fetchListeBilanRadio(idDossier:number){ 
    const url = `http://127.0.0.1:8000/api/auth/get/patient/dossier/${idDossier}/bilanRadio`;
    return this.http.get<Array<BilanRadio>>(url);
  }

  fetchBilanRadio(id:number){
    const url = `http://127.0.0.1:8000/api/auth/get/patient/dossier/bilanRadio/${id}`;
    return this.http.get<BilanRadio>(url);
  }

  fetchListeBilanBioIncompleted(id:number){ //liste des bilans bios non rempli pour rabLabInf de id de patient
    const url = `http://127.0.0.1:8000/api/auth/get/rabLabInf/patient/${id}/incBilanBio`;
    return this.http.get<Array<BilanBio>>(url);
  }

  fetchListeBilanRadioIncompleted(id:number){ //liste des bilans radio non rempli pour rabLabInf de id de patient
    const url = `http://127.0.0.1:8000/api/auth/get/rabLabInf/patient/${id}/incBilanRadio`;
    return this.http.get<Array<BilanRadio>>(url);
  }

  fetchLatestListSoin(id:number){
    const url = `http://127.0.0.1:8000/api/auth/get/patient/${id}/latestSoin`;
    return this.http.get<Array<Soin>>(url);
  }
  
  fetchListeOrdonnances(id:number){ //liste d'ordonnance de patient
    const url = `http://127.0.0.1:8000/api/auth/get/patient/${id}/ordonnance`; 
    return this.http.get<Array<Ordonnance>>(url);
  }

  fetchConsultations(idPatient: number){
    const url = `http://127.0.0.1:8000/api/auth/get/patient/${idPatient}/consultation`; 
    return this.http.get<Array<Consultation>>(url);
  }


}
