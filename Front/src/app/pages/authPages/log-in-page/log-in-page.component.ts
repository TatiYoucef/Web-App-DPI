import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient , Medcin } from '../../../modules/types' ;
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.css'
})
export class LogInPageComponent {
  constructor(private http: HttpClient) {}
  router= inject(Router); 
  errorMessage : string = '';
  onSubmit(username: string, password: string) {
    console.log('Username:', username);
    console.log('Password:', password);
    // Send data to backend API or handle logic 
    let patient : Patient ;
    let medcin : Medcin ;
    
    const loginData = {username , password};
    const loginUrl = 'http://127.0.0.1:8000/api/auth/login/'

    this.http.post(loginUrl, loginData)
    .subscribe({
      next: (response: any) => {
        console.log('Login successful:', response);
        // Handle successful login (e.g., save token, navigate to another page)
       
        switch(response.role){
          
          case "Patient" :
           patient = {
            id : response.data.id ,
            idUser : response.data.user.id , 
            nomUser : response.username ,
            nss : response.data.nss ,
            naissance: response.data.date_naissance,
            adresse: response.data.address,
            tel: response.data.phone_number,
            mutuelle:response.data.mutuelle ,
            nom : response.data.user.first_name ,
            prenom : response.data.user.last_name 
           };
           this.router.navigate(["test"]);
           console.log(patient);  
          break;
          case "Medcin" :
            medcin = {
              id : response.data.id ,
              idUser : response.data.user.id , 
              nomUser : response.username ,
              nom : response.data.user.first_name ,
              prenom : response.data.user.last_name ,
              naissance: response.data.date_naissance,
              adresse: response.data.address,
              tel: response.data.phone_number
            }        
          break;
        }
        
        

      },

      error: (error: any) => {
        console.error('Login failed:', error);
        // Handle error (e.g., show error message to user)
        this.errorMessage = 'Mot de passe ou nom d’utilisateur non valide';
        console.log(this.errorMessage)
      }
    });
  }
}
