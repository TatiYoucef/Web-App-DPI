import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PostModulesService } from '../../../services/postModules/post-modules.service';
import { catchError } from 'rxjs';
import { User } from '../../../modules/types';
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
          id: response.data.id,
          username : response.username ,
          first_name : response.data.user.first_name ,
          last_name : response.data.user.last_name ,
          email: response.data.user.email,
          role : response.role
        }
        
        console.log("User is: \n"+user);
        this.userDataService.setUserData(user); //We save the data


        switch(response.role){
          
          case "Patient" :

            this.router.navigate(['patient/consulter-DPI',user.id]);
              
          break;

          case "Medcin" :

            this.router.navigate(["medecin", user.id])
            
          break;

          case "Administratif":
            this.router.navigate(['admin', user.id]);
          break;

          default: this.router.navigate(['rabLabInf', user.id]);

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
