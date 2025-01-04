import { Injectable } from '@angular/core';
import { User } from '../../modules/types';

@Injectable({
  providedIn: 'root'
})

export class UserDataService { //classe 3endha ge3 les variables globales de user

  private user:User = {
    id: 1,
    first_name: "???",
    last_name: "???",
    username: "???",
    email: "???",
    role: "Medcin",
  };  

  getUserData(){
    return this.user;
  }

  setUserData( data:User ) :void {
    this.user = data;
  }


}
