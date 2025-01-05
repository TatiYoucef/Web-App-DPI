import { Component, inject, OnInit } from '@angular/core'; 
// Importing Angular core components and decorators
import { Bilan, TestBilan } from '../../../../modules/types'; 
// Importing Bilan and TestBilan types
import { ActivatedRoute } from '@angular/router'; 
// Importing ActivatedRoute to retrieve route parameters
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service'; 
// Service for fetching modules
import { catchError } from 'rxjs'; 
// Operator for handling errors in observables
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component"; 
// Loading screen component
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component"; 
// Dashboard component
import { HeaderComponent } from "../../../../components/header-user/header.component"; 
// Header component
import { FormsModule } from '@angular/forms'; 
// Forms module for handling form inputs
import { CommonModule } from '@angular/common'; 
// Common module for Angular directives
import { UserDataService } from '../../../../services/userData/user-data.service'; 
// Service for user data

@Component({
  selector: 'app-consulter-bilan', 
  // Component selector
  standalone: true, 
  // Declares the component as standalone
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, FormsModule, CommonModule ], 
  // Declares imported modules and components
  templateUrl: './consulter-bilan.component.html', 
  // Template for the component
  styleUrl: './consulter-bilan.component.css' 
  // Styles for the component
})

export class ConsulterBilanComponent implements OnInit { 
  // Main class implementing OnInit lifecycle hook

  isDashBoardVisible = true; 
  // Visibility state for the dashboard

  fetchServices = inject(FetchModulesService); 
  // Injecting the FetchModulesService
  idPatient!: number; 
  // Variable to store the patient ID
  idBilan!: number; 
  // Variable to store the bilan ID
  bilan!: Bilan; 
  // Variable to store the Bilan object
  user = inject(UserDataService).getUserData(); 
  // Injecting UserDataService to get user data

  router = inject(ActivatedRoute); 
  // Injecting ActivatedRoute to retrieve route parameters
  
  ngOnInit(): void { 
    // Lifecycle method called when the component initializes

    this.router.paramMap.subscribe((params) => { 
      // Subscribing to route parameter changes
      this.idPatient = Number(params.get("id1")); 
      // Getting and converting the patient ID from the route
      this.idBilan = Number(params.get("id2")); 
      // Getting and converting the bilan ID from the route
    });

    this.fetchServices.fetchBilan(this.idBilan).pipe( 
      // Fetching the bilan using the service and handling errors
      catchError((err) => { 
        // Error handling
        console.log(err); 
        // Logging the error
        throw err; 
        // Rethrowing the error
      })
    ).subscribe((bil) => { 
      // Subscribing to the fetched bilan data
      this.bilan = bil; 
      // Assigning the fetched bilan to the local variable

      if (this.bilan.tests.length === 0) { 
        // If no tests exist in the bilan
        this.bilan.tests.push({ 
          // Add a placeholder test
          id: this.bilan.tests.length, 
          testName: '', 
          result: null 
        });
      }
    });
  }

  updateDashboardVisibility(isVisible: boolean) { 
    // Method to update dashboard visibility
    this.isDashBoardVisible = isVisible;
  }

  addTest() { 
    // Method to add a new test to the bilan
    this.bilan.tests.push({
      id: this.bilan.tests.length, 
      testName: '', 
      result: null
    });
  }

  removeTest(index: number) { 
    // Method to remove a test by its index
    this.bilan.tests.splice(index, 1);
  }

  patchBilan() { 
    // Method to update (patch) the bilan
    console.log("Bilan updated to", this.bilan); 
    // Logging the updated bilan
  }
}
