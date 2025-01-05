import { Component, inject } from '@angular/core'; // Importing Angular core components
import { Router } from '@angular/router'; // Importing Angular router for navigation
import { PostModulesService } from '../../../services/postModules/post-modules.service'; // Importing service to handle login POST requests
import { catchError } from 'rxjs'; // Importing catchError for error handling in RxJS
import { User } from '../../../modules/types'; // Importing User type for type safety
import { UserDataService } from '../../../services/userData/user-data.service'; // Importing service to handle user data storage

@Component({
  selector: 'app-log-in-page', // The selector to use this component in the HTML
  standalone: true, // This component is a standalone component
  imports: [], // No additional imports for this component
  templateUrl: './log-in-page.component.html', // Path to the HTML template
  styleUrl: './log-in-page.component.css' // Path to the CSS stylesheet
})
export class LogInPageComponent { 

  // Injecting the required services and dependencies into the component
  router = inject(Router); // Injecting Angular's Router for navigation
  postServices = inject(PostModulesService); // Injecting the PostModulesService for login functionality
  userDataService = inject(UserDataService); // Injecting the UserDataService for saving user data
  errorMessage: string = ''; // Error message to display if login fails

  // Method called when the user submits the login form
  onSubmit(username: string, password: string){

    // Calling the login method from PostModulesService, with error handling using catchError
    this.postServices.postLogIn(username, password).pipe( //pipe to catch any error
      catchError((err) => { // Catching and logging any errors
        console.log(err);
        throw err; // Re-throwing the error to be handled later
      })
    ).subscribe({

      // If the login is successful
      next: (response: any) => {
        console.log('Login successful:', response); // Log success message

        // Creating a user object from the response data
        let user: User = {
          id: response.data.id,
          username: response.username,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          email: response.data.user.email,
          role: response.role
        }
        
        console.log("User is: \n" + user); // Log the user data
        this.userDataService.setUserData(user); // Saving the user data using the UserDataService

        // Navigating the user to different pages based on their role
        switch(response.role){
          
          case "Patient":
            // Navigate to the patient page
            this.router.navigate(['patient/consulter-DPI', user.id]);
            break;

          case "Medcin":
            // Navigate to the doctor page
            this.router.navigate(["medecin", user.id]);
            break;

          case "Administratif":
            // Navigate to the admin page
            this.router.navigate(['admin', user.id]);
            break;

          default: 
            // Navigate to a default page if no role matches
            this.router.navigate(['rabLabInf', user.id]);
        }
        
      },

      // If login fails
      error: (error: any) => {
        console.error('Login failed:', error); // Log the error
        // Set an error message to notify the user
        this.errorMessage = "Mot de passe ou nom d'utilisateur non valide";
        console.log(this.errorMessage); // Log the error message
      }
    });

  }

}
