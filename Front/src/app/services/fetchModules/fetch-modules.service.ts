import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Patient } from '../../modules/types';

@Injectable({
  providedIn: 'root'
})

export class FetchModulesService { //Hna yesraw les fetch functions

  http = inject(HttpClient);

  fetchListePatient(){
    const url = "http://127.0.0.1:8000/api/auth/get/admin/patient"; //Json Test, not from backend
    return this.http.get<Array<Patient>>(url);
  }

  fetchListeTestsBilan(){
    const url = "http://localhost:3000/bilanMedecin"; //Json Test, not from backend
    return this.http.get(url);
  }
}
