import { Injectable } from '@angular/core'; // Importing Injectable to create a service
import { User } from '../../modules/types'; // Importing User type from types module

@Injectable({
  providedIn: 'root' // Making this service available application-wide
})

export class UserDataService { // Service class that holds the global user variables

  private user: User = { // Initial user data, with default values
    id: 0, // User ID
    first_name: "???", // User's first name
    last_name: "???", // User's last name
    username: "???", // User's username
    email: "???", // User's email
    role: "Medcin", // User's role (default is 'Medcin')
  };

  // Function to get the current user data
  getUserData(){
    return this.user; // Returning the current user data
  }

  // Function to set the user data
  setUserData(data: User): void { // Accepts new user data and updates the user
    this.user = data; // Assigning the new data to the user variable
  }

}
