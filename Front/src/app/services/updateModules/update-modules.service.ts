import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MedicalRecord } from '../../modules/types';

@Injectable({
  providedIn: 'root'
})
export class UpdateModulesService {

  http = inject(HttpClient);

  updatePatientAccount(username:String, password:String, id:number){ //créer un compte au patient en ajoutant username et password

    const apiUrl = `http://127.0.0.1:8000/api/auth/get/medcin/patient/${id}/update`
    const bodyRequest = {
      "username" : username ,
      "password" : password ,
    }

    return this.http.put(apiUrl , bodyRequest);

  }

  ajoutResultsBioForPatient(results: Array<MedicalRecord>, id_bilan:number){

    const requestUpdate = {
      resultats_analytiques : results
    }

    const apiUrl = `http://127.0.0.1:8000/api/auth/post/rabLabInf/patient/incBilanBio/update/${id_bilan}`;

    return this.http.put(apiUrl, requestUpdate);

  }

  ajoutComptRenduForPatient(compte_rendu: String, id_bilan:number){
    const requestUpdate = {
      compte_rendu: compte_rendu
    }

    const apiUrl = `http://127.0.0.1:8000/api/auth/post/rabLabInf/patient/incBilanRadio/update/${id_bilan}`;

    return this.http.put(apiUrl, requestUpdate);

  }

  modifyLatesSoinList(requestUpdate: Object, id:number){

    const apiUrl = `http://127.0.0.1:8000/api/auth/get/patient/${id}/latestSoin/modify`;
    return this.http.put(apiUrl, requestUpdate);

  }

  modifyAntecedent(antecedants: String, idDossier: number){

    const requestUpdate = {
      antecedants: antecedants
    }

    const apiUrl = `http://127.0.0.1:8000/api/auth/post/patient/dossier/${idDossier}/antecedant`
    return this.http.put(apiUrl, requestUpdate);

  }

  toggleStateHospitalPatient(id: number){ //changer le boolean Patient à vrai/faux s'il est en cours de traitement ou pas
    const apiUrl = `http://127.0.0.1:8000/api/auth/post/patient/traitement/${id}`;
    return this.http.put(apiUrl, "");
  }

}
