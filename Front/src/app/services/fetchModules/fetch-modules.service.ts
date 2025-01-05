import { HttpClient } from '@angular/common/http'; // Importing HttpClient to perform HTTP requests
import { inject, Injectable } from '@angular/core'; // Injecting and making the service injectable
import { Bilan, BilanBio, BilanRadio, Consultation, Patient, Soin } from '../../modules/types'; // Importing necessary types
import { DPI } from '../../modules/types'; // Importing DPI type

@Injectable({
  providedIn: 'root' // Making this service available application-wide
})

export class FetchModulesService { // Service to handle all fetch requests

  http = inject(HttpClient); // Injecting HttpClient to make HTTP requests

  // Function to fetch list of hospitalised patients, for handling by nurse, radiologist, or laboratory
  fetchListePatientHospitalised(){ 
    const url = "http://127.0.0.1:8000/api/auth/get/rabLabInf/patient"; // URL for fetching hospitalised patients
    return this.http.get<Array<Patient>>(url); // Sending GET request and returning the list of patients
  }

  // Function to fetch list of patients without accounts, for admin to add accounts
  fetchListePatientSansCompte(){ 
    const url = "http://127.0.0.1:8000/api/auth/get/admin/patient"; // URL for fetching patients without accounts
    return this.http.get<Array<Patient>>(url); // Sending GET request and returning the list of patients
  }

  // Function to fetch patient by ID
  fetchPatient( id:number ){ 
    const url = `http://127.0.0.1:8000/api/auth/get/medcin/patient/${id}`; // URL with patient ID
    return this.http.get<Patient>(url); // Sending GET request for a specific patient
  }

  // Function to fetch patient by NSS (National Social Security number)
  fetchPatientNss(nss: number){ 
    const url = `http://127.0.0.1:8000/api/auth/get/patient/${nss}`; // URL with NSS
    return this.http.get<Patient>(url); // Sending GET request for a specific patient by NSS
  }
  
  // Function to fetch DPI (Patient File) by dossier ID
  fetchDPI(idDossier: number){ 
    const url = `http://127.0.0.1:8000/api/auth/get/patient/dossier/${idDossier}`; // URL with dossier ID
    return this.http.get<DPI>(url); // Sending GET request to fetch patient file
  }

  // Function to fetch list of incomplete bilan (tests)
  fetchListeBilan(){ 
    const url = `http://127.0.0.1:8000/api/auth/post/rabLabInf/patient/incBilanBio`; // URL for fetching incomplete bilan
    return this.http.get<Array<Bilan>>(url); // Sending GET request to fetch list of bilans
  }

  // Function to fetch a specific bilan (test)
  fetchBilan(id:number){ 
    const url = "http://localhost:3000/Bilans"; // URL for testing purposes (not from backend)
    return this.http.get<Bilan>(url); // Sending GET request to fetch a specific bilan
  }

  // Function to fetch list of incomplete biological bilans for a specific patient
  fetchListeBilanBioIncompleted(id:number){ 
    const url = `http://127.0.0.1:8000/api/auth/get/rabLabInf/patient/${id}/incBilanBio`; // URL for fetching incomplete biological bilans
    return this.http.get<Array<BilanBio>>(url); // Sending GET request to fetch list of biological bilans
  }

  // Function to fetch list of incomplete radiology bilans for a specific patient
  fetchListeBilanRadioIncompleted(id:number){ 
    const url = `http://127.0.0.1:8000/api/auth/get/rabLabInf/patient/${id}/incBilanRadio`; // URL for fetching incomplete radiology bilans
    return this.http.get<Array<BilanRadio>>(url); // Sending GET request to fetch list of radiology bilans
  }

  // Function to fetch the latest soins (care) for a specific patient
  fetchLatestListSoin(id:number){ 
    const url = `http://127.0.0.1:8000/api/auth/get/patient/${id}/latestSoin`; // URL for fetching latest soins
    return this.http.get<Array<Soin>>(url); // Sending GET request to fetch latest soins for a specific patient
  }
  
  // Function to fetch list of prescriptions (ordonnances)
  fetchListeOrdonnances(){ 
    const url = "http://localhost:3000/DPIs"; // URL for testing purposes (not from backend)
    return this.http.get(url); // Sending GET request to fetch list of prescriptions
  }

  // Function to fetch consultations for a specific patient
  fetchConsultations(idPatient: number){ 
    const url = `http://127.0.0.1:8000/api/auth/get/patient/${idPatient}/consultation`; // URL for fetching consultations for a specific patient
    return this.http.get<Array<Consultation>>(url); // Sending GET request to fetch consultations
  }

}
