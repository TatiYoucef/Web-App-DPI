import { Component, inject, OnInit, signal } from '@angular/core';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { Soin } from '../../../../modules/types';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { UpdateModulesService } from '../../../../services/updateModules/update-modules.service';

@Component({
  selector: 'app-ajout-soin',
  standalone: true,
  imports: [FormsModule, LoadingScreenComponent, DashBoardComponent, HeaderComponent, CommonModule],
  templateUrl: './ajout-soin.component.html',
  styleUrl: './ajout-soin.component.css'
})
export class AjoutSoinComponent implements OnInit{

  isDashBoardVisible = true; // Boolean to control dashboard visibility
  
  user = inject(UserDataService).getUserData() // Inject user data service and retrieve the user data
  fetchServices = inject(FetchModulesService) // Inject the fetch services
  updateServices = inject(UpdateModulesService); // Inject the update services
  id!: number; // Patient ID to be extracted from the route
  idP!: number; // ID for the patient profile
  router = inject(ActivatedRoute); // ActivatedRoute to fetch parameters from the URL
  rout = inject(Router); // Router for navigation

  oldListe !: Array<Soin>; // Old list of soins (treatments)
  newListe !: Array<Soin>; // New list of soins (with updated data)
  removedIds:Array<number> = []; // Array to store removed soin ids

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible); // Logs the dashboard visibility change
    this.isDashBoardVisible = isVisible; // Updates the visibility of the dashboard
  }

  ngOnInit(): void { // ngOnInit lifecycle hook, called on component initialization

    this.router.paramMap.subscribe((params) => {
      this.id = Number(params.get("id")); // Extract patient ID from the route
      this.idP = Number(params.get("idP")); // Extract patient profile ID from the route
    });

    this.fetchServices.fetchLatestListSoin(this.id).pipe( // Fetch latest list of soins for the patient
      catchError((err) => {
        console.log(err); // Log any errors that occur during fetching
        throw err;
      })
    ).subscribe((liste) => {

      this.oldListe = liste; // Store the fetched list of soins as oldListe
      this.newListe = this.oldListe; // Set the newListe to be the same as the oldListe initially
      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-CA'); // Format the current date in 'yyyy-mm-dd' format
      console.log(formattedDate); // Logs the formatted date (e.g., "2025-01-04")
      
      this.newListe.push({
        id: 0, // id 0 to identify new soins
        infirmier:this.user.id, // Assign the current user's ID as the nurse
        description: '',
        subject: '',
        date: formattedDate, // Assign the formatted date to the new soin
      });

    })
  }

  addSoin() {
    // Adds a new soin if both the description and subject are filled
    if (this.newListe[this.newListe.length - 1].description != "" 
    && this.newListe[this.newListe.length - 1].subject != "") { 

      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-CA'); // Format the current date in 'yyyy-mm-dd' format

      this.newListe.push({
        id: 0, // id 0 to identify new soins
        infirmier:this.user.id, // Assign the current user's ID as the nurse
        description: '',
        subject: '',
        date: formattedDate, // Assign the formatted date to the new soin
      });
    }
  }

  removeSoin(index: number) {
    // Adds the removed soin's ID to removedIds array and removes it from newListe
    this.removedIds.push(this.newListe[index].id);
    this.newListe.splice(index, 1); // Removes the soin at the specified index
  }

  testIsFilled() {
    let isAllFilled = true; // Initialize a flag to check if all fields are filled

    this.newListe.forEach((soin) => {
      // Check if either description or subject is missing in any soin
      if(!soin.description || !soin.subject) {
        alert(`Veuillez remplir les données de soin ${this.newListe.indexOf(soin) + 1}`); // Alert to fill missing data
        isAllFilled = false; // Set the flag to false if any field is empty
      }
    })

    return isAllFilled; // Return whether all fields are filled
  }

  sauvegarder() {
    // Save the soins data if all fields are filled
    if (this.testIsFilled()) { 

      type dataSoin = { // Define the type for a soin (treatment)
        id?: number; // Optional because new soins may not have an ID yet
        infirmier: number, // Nurse ID
        subject: String, // Subject of the soin
        description: String, // Description of the soin
        date: String, // Date of the soin
      };

      type Change = { // Define the type for changes (add, remove, update)
        add: Array<dataSoin>, // Array of new soins to add
        remove: Array<number>, // Array of soin ids to remove
        update: Array<dataSoin> // Array of updated soins
      };

      let changes: Change = {
        add: [], // Initialize the add array
        remove: [], // Initialize the remove array
        update: [], // Initialize the update array
      };

      this.newListe.forEach((soin) => {
        // Loop through each soin and categorize it based on its ID
        if (soin.id === 0) { // New soin (id 0)
          changes.add.push({
            infirmier: soin.infirmier,
            subject: soin.subject,
            description: soin.description,
            date: soin.date
          });
        } else if (this.oldListe.indexOf(soin) >= 0) { // Existing soin
          changes.update.push({
            id: soin.id,
            infirmier: soin.infirmier,
            subject: soin.subject,
            description: soin.description,
            date: soin.date
          })
        }
      })

      this.removedIds.filter((id) => id != 0); // Filter out any id that is 0 (which represents a new soin)
      changes.remove = this.removedIds; // Set the remove array with the removed soin ids
      console.log(changes); // Logs the changes object for debugging

      this.updateServices.modifyLatesSoinList(changes, this.id).subscribe({
        next: (response: any) => {
          console.log(response); // Logs the response from the server
          alert("La liste des soins est sauvegardé !"); // Alert that the soins list is saved
          this.rout.navigate(['rabLabInf', this.idP]); // Navigate to another page after saving
        },
        error: (error: any) => {
          console.error('Error fetching:', error); // Logs any errors that occur during the update process
          alert("Il a eut un problème de saisie, veuillez ajouter correctement le saisie"); // Alert if there is an error
        }
      });
    }
  }
}
