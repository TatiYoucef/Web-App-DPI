// Importing necessary Angular modules and components
import { Component } from '@angular/core';
import { HeaderComponent } from "../../../components/header-user/header.component";  // Header component for user
import { DashBoardComponent } from "../../../components/dash-board/dash-board.component";  // Dashboard component
import { LoadingScreenComponent } from "../../../components/loading-screen/loading-screen.component";  // Loading screen component
import { CommonModule } from '@angular/common';  // Common module to use common Angular directives

@Component({
  selector: 'app-notification-page',  // Selector to use this component in templates
  standalone: true,  // Declaring the component as standalone, meaning it can be used independently without a module
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule],  // Importing necessary components and modules
  templateUrl: './notification-page.component.html',  // Path to the template file
  styleUrl: './notification-page.component.css'  // Path to the style file
})
export class NotificationPageComponent {

  // Boolean variable to control the visibility of the dashboard
  isDashBoardVisible = true;

  // Method to update the visibility of the dashboard based on input
  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;  // Updating the visibility state
  }

}
