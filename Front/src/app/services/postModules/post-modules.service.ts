import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostModulesService {

  http = inject(HttpClient);

  postLogIn(username: string, password: string){

    const loginUrl = "http://127.0.0.1:8000/api/auth/login/"
    const loginData = {username , password};

    return this.http.post(loginUrl, loginData);
  }
}
