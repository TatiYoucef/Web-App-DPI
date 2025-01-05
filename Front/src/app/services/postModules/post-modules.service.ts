import { HttpClient } from '@angular/common/http'; // Importing HttpClient to perform HTTP requests
import { inject, Injectable } from '@angular/core'; // Injecting and making the service injectable

@Injectable({
  providedIn: 'root' // Making this service available application-wide
})
export class PostModulesService {

  http = inject(HttpClient); // Injecting HttpClient to make HTTP requests

  // Function to handle user login with username and password
  postLogIn(username: string, password: string){

    const loginUrl = "http://127.0.0.1:8000/api/auth/login/" // URL for login API
    const loginData = {username , password}; // Creating login data object with username and password

    return this.http.post(loginUrl, loginData); // Sending POST request with login data
  }

  // Function to create a new patient (DPI)
  createPatient(patientData: Object){ // Function to create patient data
    const apiUrl = 'http://127.0.0.1:8000/api/auth/register/patient' ; // URL for patient registration API
    
    // Sending POST request to create a new patient
    this.http.post(apiUrl , patientData).subscribe({
      next: (response:any)=>{ // On success, logging the response
        console.log(response);
      },
      error : (error: any) =>{ // On error, logging the error and alerting the user
        console.error('Error fetching patient:', error);
        alert("Il a eut une erreur pendant la création de DPI, veuillez vérifier vos données") // Alerting error in patient creation
      }
    });

  }
}
