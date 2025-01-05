import { HttpClient } from '@angular/common/http'; // Importing HttpClient to perform HTTP requests
import { inject, Injectable } from '@angular/core'; // Injecting and making the service injectable
import { MedicalRecord } from '../../modules/types'; // Importing MedicalRecord type from the types module

@Injectable({
  providedIn: 'root' // Making this service available application-wide
})
export class UpdateModulesService {

  http = inject(HttpClient); // Injecting HttpClient to make HTTP requests

  // Function to update the patient's account by adding a username and password
  updatePatientAccount(username: String, password: String, id: number){ // Update patient's username and password
    const apiUrl = `http://127.0.0.1:8000/api/auth/get/medcin/patient/${id}/update` // URL for updating patient account
    const bodyRequest = {
      "username": username, // Username to be updated
      "password": password, // Password to be updated
    }

    return this.http.put(apiUrl, bodyRequest); // Sending PUT request to update patient account
  }

  // Function to add analytical results for the patient
  ajoutResultsBioForPatient(results: Array<MedicalRecord>, id_bilan: number){
    const requestUpdate = {
      resultats_analytiques: results // Results to be added for the patient
    }

    const apiUrl = `http://127.0.0.1:8000/api/auth/post/rabLabInf/patient/incBilanBio/update/${id_bilan}`; // URL for updating bio results

    return this.http.put(apiUrl, requestUpdate); // Sending PUT request to update bio results
  }

  // Function to add a medical report for the patient
  ajoutComptRenduForPatient(compte_rendu: String, id_bilan: number){
    const requestUpdate = {
      compte_rendu: compte_rendu // Medical report to be added for the patient
    }

    const apiUrl = `http://127.0.0.1:8000/api/auth/post/rabLabInf/patient/incBilanRadio/update/${id_bilan}`; // URL for updating medical report

    return this.http.put(apiUrl, requestUpdate); // Sending PUT request to update the medical report
  }

  // Function to modify the latest soins list for the patient
  modifyLatesSoinList(requestUpdate: Object, id: number){
    const apiUrl = `http://127.0.0.1:8000/api/auth/get/patient/${id}/latestSoin/modify`; // URL for modifying soins list
    return this.http.put(apiUrl, requestUpdate); // Sending PUT request to modify the latest soins list
  }

  // Function to modify the patient's antecedents (medical history)
  modifyAntecedent(antecedants: String, idDossier: number){
    const requestUpdate = {
      antecedants: antecedants // Medical history to be updated
    }

    const apiUrl = `http://127.0.0.1:8000/api/auth/post/patient/dossier/${idDossier}/antecedant` // URL for updating antecedents
    return this.http.put(apiUrl, requestUpdate); // Sending PUT request to update antecedents
  }

  // Function to toggle the state of the patient (in treatment or not)
  toggleStateHospitalPatient(id: number){ // Changing the patient's treatment state to true/false
    const apiUrl = `http://127.0.0.1:8000/api/auth/post/patient/traitement/${id}`; // URL for toggling patient's treatment state
    return this.http.put(apiUrl, ""); // Sending PUT request to toggle the state
  }

}
