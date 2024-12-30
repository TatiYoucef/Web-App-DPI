import { Injectable } from '@angular/core';
import { User , Patient} from '../../modules/types';

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
    role: "Administratif",

  };  

  getUserData(){
    return this.user;
  }

  setUserData( data:User ) :void {
    this.user = data;
  }


}
/*
export class PatientDataService { //classe 3endha ge3 les variables globales de user

  private patient:Patient = {
    id: 0,
    id_DPI : 0 , 
    idUser : 0 ,
    nom: "Toutou",
    prenom: "Youyou",
    nomUser: "louli",
    naissance: "01/01/2000",
    adresse: "Kherrouba, Alger, Algérie",
    tel: "0555447788",
    nss: 3476583459,
    mutuelle: "alo",
    qrcode:"hudfc"

  };  

  getPatientData(){
    return this.patient;
  }

  setPatientData( data:Patient ) :void {
    this.patient = data;
  }


}*/