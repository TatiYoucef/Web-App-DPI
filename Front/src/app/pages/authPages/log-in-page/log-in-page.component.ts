import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostModulesService } from '../../../services/postModules/post-modules.service';
import { catchError } from 'rxjs';
import { Medcin, Patient, User } from '../../../modules/types';
import { UserDataService } from '../../../services/userData/user-data.service';

@Component({
  selector: 'app-log-in-page',
  standalone: true,
  imports: [],
  templateUrl: './log-in-page.component.html',
  styleUrl: './log-in-page.component.css'
})
export class LogInPageComponent { 

  router= inject(Router); 
  postServices = inject(PostModulesService);
  userDataService = inject(UserDataService);
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

        let user:User = {
          id: response.data.user.id,
          nomUser : response.username ,
          nom : response.data.user.first_name ,
          prenom : response.data.user.last_name ,
          naissance: response.data.date_naissance,
          adresse: response.data.address,
          tel: response.data.phone_number,
          role : response.role
        }
        
        console.log("User is: \n"+user);
        this.userDataService.setUserData(user); //We save the data
        console.log(user)

        switch(response.role){
          
          case "Patient" :

            this.router.navigate(["patient"]);
              
          break;

          case "Medcin" :

            this.router.navigate(["medecin"])
            
          break;

          case "Administratif" :
            console.log('howww');
            this.router.navigate(["admin"])
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
