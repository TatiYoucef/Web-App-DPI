import { Component, EventEmitter, inject, Output, signal, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../services/userData/user-data.service';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit{

  isDashBoard = signal(true);  // Dashboard is visible by default on larger screens
  @Output() changeDashEvent = new EventEmitter<boolean>();

  router = inject(Router);  // Router service
  user = inject(UserDataService).getUserData();  // Get user data

  isNotiPage = signal(false);  // Notification page state

  screenWidth: number = window.innerWidth;

  ngOnInit(): void {

    if(this.user.role != "Patient" && this.router.url.includes('patient')){
      alert("Vous devez s'authentifier en tant que patient pour naviguer à cette page")
      this.router.navigate(['']);
    }

    if(this.user.role != "Medcin" && this.router.url.includes('medecin')){
      alert("Vous devez s'authentifier en tant que medecin pour naviguer à cette page")
      this.router.navigate(['']);
    }

    if(this.user.role != "Administratif" && this.router.url.includes('admin')){
      alert("Vous devez s'authentifier en tant que medecin pour naviguer à cette page")
      this.router.navigate(['']);
    }

    if(this.user.role != "Radiologue" && this.user.role != "Laborantin"  && this.user.role != "Infirmier" && this.router.url.includes('rabLabInf')){
      alert("Vous devez s'authentifier en tant que Radio/Labo/Infirmier pour naviguer à cette page")
      this.router.navigate(['']);
    }

    if(this.router.url.includes('notif')){
      this.isNotiPage.set(true);
    } else {
      this.isNotiPage.set(false);
    }
    
  }

  constructor() {
    // On initialization, check screen width and set dashboard visibility
    this.updateDashboardState();
  }

  @HostListener('window:resize')
  onResize() {
    this.screenWidth = window.innerWidth;
    this.updateDashboardState();
  }

  // Update the dashboard visibility based on screen size
  updateDashboardState() {
    const shouldShowDashboard = this.screenWidth > 768;
    this.isDashBoard.set(shouldShowDashboard); // Update state
    this.changeDashEvent.emit(shouldShowDashboard); // Emit change
  }

  goToNotifications() {
    this.router.navigate(["/notif"]);
  }

  toggleDashboard() {
    this.isDashBoard.update((prev) => !prev);
    this.changeDashEvent.emit(this.isDashBoard());
  }

  changeDashState() {
    console.log("Dashboard toggle button clicked!");
    this.isDashBoard.update((prevState) => !prevState); // Toggle visibility
    this.changeDashEvent.emit(this.isDashBoard()); // Emit updated state
  }  

  get buttonClass(): string {
    return this.isDashBoard() ? 'shifted' : '';  // Add 'shifted' class if dashboard is visible
  }
}
