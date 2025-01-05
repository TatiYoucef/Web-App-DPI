import { Component, EventEmitter, inject, Output, signal, HostListener } from '@angular/core'; 
// Importing Angular core features and utilities

import { Router } from '@angular/router'; 
// Importing Router for navigation between routes

import { UserDataService } from '../../services/userData/user-data.service'; 
// Importing a custom service to fetch user data

@Component({
  selector: 'app-dash-board', // Selector for the dashboard component
  standalone: true, // Indicates that the component can operate independently
  imports: [], // No additional Angular modules are imported here
  templateUrl: './dash-board.component.html', // Path to the component's HTML template
  styleUrl: './dash-board.component.css' // Path to the component's CSS file
})

export class DashBoardComponent {

  isDashBoard = signal(true);  
  // Signal to manage the visibility of the dashboard, default is visible

  router = inject(Router); 
  // Dependency injection of Router service for route navigation

  user = inject(UserDataService).getUserData(); 
  // Fetching user data using the custom UserDataService

  goToDisconnect() {
    this.router.navigate([""]); 
    // Navigates to the root route, typically for logout
  }

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoard.set(isVisible); 
    // Updates the dashboard visibility state based on the provided boolean
  }

  goToHome() {
    // Navigation logic based on the user's role
    switch (this.user.role) {

      case "Administratif": 
        // If user role is "Administratif", navigate to the admin route
        this.router.navigate(['admin', this.user.id]);
        break;

      case "Medcin": 
        // If user role is "Medcin" (Doctor), navigate to the doctor's route
        this.router.navigate(['medecin', this.user.id]);
        break;

      case "Patient": 
        // If user role is "Patient", navigate to the patient's DPI (Dossier Patient Informatisé) page
        this.router.navigate([`patient/consulter-DPI/${this.user.id}`]);
        break;

      default: 
        // Default case for "rablabinf" (e.g., Lab Technician)
        this.router.navigate(['rabLabInf', this.user.id]);
    }
  }

}
