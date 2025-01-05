import { Component, EventEmitter, inject, Output, signal, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../services/userData/user-data.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives

@Component({
  selector: 'app-header', // Component selector
  standalone: true, // Indicates this component can be used independently
  imports: [CommonModule], // Import CommonModule for Angular directives
  templateUrl: './header.component.html', // Path to the component's HTML template
  styleUrls: ['./header.component.css'] // Path to the component's CSS styles
})

export class HeaderComponent implements OnInit {

  isDashBoard = signal(true);  // State to track dashboard visibility, default is visible on larger screens
  @Output() changeDashEvent = new EventEmitter<boolean>(); // Event emitter for dashboard state changes

  router = inject(Router);  // Inject the Router service to handle navigation
  user = inject(UserDataService).getUserData();  // Retrieve user data from UserDataService

  isNotiPage = signal(false);  // State to track if the current page is the notification page

  screenWidth: number = window.innerWidth; // Store the current screen width

  ngOnInit(): void {
    // Check user authentication on initialization
    if (this.user.role === "???") {
      alert("Vous devez s'authentifier pour naviguer à cette route"); // Display alert if user is not authenticated
      this.router.navigate(['']); // Redirect to the login page
    }

    // Determine if the current URL includes 'notif' to set notification page state
    if (this.router.url.includes('notif')) {
      this.isNotiPage.set(true); // Set notification state to true
    } else {
      this.isNotiPage.set(false); // Set notification state to false
    }
  }

  constructor() {
    // Check the screen size on component initialization and update dashboard state
    this.updateDashboardState();
  }

  @HostListener('window:resize') // Listen for window resize events
  onResize() {
    this.screenWidth = window.innerWidth; // Update the screen width
    this.updateDashboardState(); // Update the dashboard visibility state
  }

  // Function to update the dashboard visibility based on screen size
  updateDashboardState() {
    const shouldShowDashboard = this.screenWidth > 768; // Show dashboard only on screens wider than 768px
    this.isDashBoard.set(shouldShowDashboard); // Update the dashboard visibility state
    this.changeDashEvent.emit(shouldShowDashboard); // Emit an event with the updated state
  }

  // Function to navigate to the notification page
  goToNotifications() {
    this.router.navigate(["/notif"]); // Navigate to the notification page
  }

  // Toggle the dashboard visibility state
  toggleDashboard() {
    this.isDashBoard.update((prev) => !prev); // Toggle the current state
    this.changeDashEvent.emit(this.isDashBoard()); // Emit the updated state
  }

  // Alternate method to toggle dashboard visibility with logging
  changeDashState() {
    console.log("Dashboard toggle button clicked!"); // Log the toggle event
    this.isDashBoard.update((prevState) => !prevState); // Toggle the current state
    this.changeDashEvent.emit(this.isDashBoard()); // Emit the updated state
  }

  // Dynamically determine the button class based on dashboard visibility
  get buttonClass(): string {
    return this.isDashBoard() ? 'shifted' : ''; // Return 'shifted' class if dashboard is visible
  }
}
