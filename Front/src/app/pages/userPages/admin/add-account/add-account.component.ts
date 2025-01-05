import { Component, inject, signal } from '@angular/core'; // Importing necessary Angular core functionalities
import { ActivatedRoute, Router } from '@angular/router'; // Importing Angular router functionalities for navigation and route parameters
import { HeaderComponent } from "../../../../components/header-user/header.component"; // Importing header component
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component"; // Importing dashboard component
import { Patient } from '../../../../modules/types'; // Importing Patient type from the types module
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service'; // Importing service to fetch patient data
import { catchError } from 'rxjs'; // Importing RxJS catchError operator to handle errors
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component"; // Importing loading screen component
import { CommonModule } from '@angular/common'; // Importing common Angular module for common directives
import { UpdateModulesService } from '../../../../services/updateModules/update-modules.service'; // Importing service to update patient data

@Component({
  selector: 'app-add-account', // The selector for this component
  standalone: true, // Indicates this component is standalone
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule], // Importing required components and modules
  templateUrl: './add-account.component.html', // Path to the template for the component
  styleUrl: './add-account.component.css' // Path to the CSS for the component
})

export class AddAccountComponent {

  isDashBoardVisible = true; // Variable to control the visibility of the dashboard

  id!: number; // Patient ID to create an account for
  idA!: number; // Admin ID
  router = inject(ActivatedRoute); // Injecting ActivatedRoute to access route parameters
  routing = inject(Router); // Injecting Router to navigate between pages

  patient!: Patient; // The patient object, initialized after fetching data
  fetchServices = inject(FetchModulesService); // Injecting the service to fetch patient data
  updateServices = inject(UpdateModulesService); // Injecting the service to update patient account data

  ngOnInit(): void { // Lifecycle hook called on component initialization

    this.router.paramMap.subscribe((params) =>{ // Subscribing to route parameters
      this.id = Number(params.get("id")); // Fetching the patient ID from the route
      this.idA = Number(params.get("idA")); // Fetching the admin ID from the route
    });

    console.log(this.id); // Logging the patient ID to the console

    this.fetchServices.fetchPatient(this.id).pipe( // Fetching the patient data based on the patient ID
      catchError((err) => { // Handling any errors while fetching the patient data
        console.log(err); // Logging the error
        throw err; // Re-throwing the error
      })
    ).subscribe((pat: any) => { // Subscribing to the response after fetching the patient data
      this.patient = pat; // Assigning the fetched patient data to the patient variable
    })
      
  }
    
  updateDashboardVisibility(isVisible: boolean) { // Method to update the visibility of the dashboard
    console.log('Dashboard visibility updated:', isVisible); // Logging the updated visibility status
    this.isDashBoardVisible = isVisible; // Updating the dashboard visibility
  }

  creerCompte(username: String, password: String) { // Method to create a new account for the patient

    if (!username || password.length < 8) { // Checking if the username is empty or if the password length is less than 8 characters
      alert("Veuillez remplir tous les informations, mot de passe doit dépasser 8 caractères") // Alerting the user to fill in all information and have a password longer than 8 characters
    } else { // If the inputs are valid
      this.updateServices.updatePatientAccount(username, password, this.patient.id).subscribe({ // Calling the service to update the patient account
        next: (response: any) => { // If the account update is successful
          console.log(response.user) // Logging the updated user data
          this.routing.navigate(['admin', this.idA, 'gestionPatient']); // Navigating to the patient management page for the admin
        },

        error: (error: any) => { // Handling any errors during the account update
          console.error('Error fetching patient:', error); // Logging the error
        }
      })
    }

  }

}
