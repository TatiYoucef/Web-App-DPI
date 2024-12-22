import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostModulesService } from '../../../services/postModules/post-modules.service';
import { catchError } from 'rxjs';
import { Medcin, Patient } from '../../../modules/types';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.css'
})
export class LogInPageComponent { 

  router= inject(Router); 
  postServices = inject(PostModulesService) 
  errorMessage : string = '';

  onSubmit(username: string, password: string){

    this.postServices.postLogIn(username, password).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })

    ).subscribe({

      next: (response: any) => {
        console.log('Login successful:', response);
        // Handle successful login (e.g., save token, navigate to another page)
        
        switch(response.role){
          
          case "Patient" :

            let patient:Patient;
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

            let medcin:Medcin;

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
        this.errorMessage = "Mot de passe ou nom d'utilisateur non valide";
        console.log(this.errorMessage)
      }
    });

  }

}
