import { Injectable } from '@angular/core';
import { User } from '../../modules/types';

@Injectable({
  providedIn: 'root'
})

export class UserDataService { //classe 3endha ge3 les variables globales de user

  private user:User = {
    id: 0,
    nom: "Toutou",
    prenom: "Youyou",
    nomUser: "louli",
    naissance: "01/01/2000",
    adresse: "Kherrouba, Alger, Algérie",
    tel: "0555447788",
    role: "Laborantin",
  };  

  getUserData(){
    return this.user;
  }

  setUserData( data:User ) :void {
    this.user = data;
  }


}
