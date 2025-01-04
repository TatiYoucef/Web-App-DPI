import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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

}
