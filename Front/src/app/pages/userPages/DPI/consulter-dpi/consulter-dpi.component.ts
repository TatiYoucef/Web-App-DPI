import { Component, inject, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { UserDataService } from '../../../../services/userData/user-data.service';
import { CommonModule } from '@angular/common'; // Import CommonModule to use Angular's built-in directives and pipes
import { ActivatedRoute, Router } from '@angular/router';
import { DPI, Patient } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { UpdateModulesService } from '../../../../services/updateModules/update-modules.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consulter-dpi',
  standalone: true, // Standalone component setting to use in isolation
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule], // Import required modules and components
  templateUrl: './consulter-dpi.component.html',
  styleUrl: './consulter-dpi.component.css',
  providers: [DatePipe] // DatePipe for date formatting
})

export class ConsulterDPIComponent implements OnInit {

  isDashBoardVisible = true; // Variable to control the visibility of the dashboard

  fetchServices = inject(FetchModulesService); // Inject the service to fetch patient and DPI data
  updateServices = inject(UpdateModulesService); // Inject the service to update the patient's antecedents

  id!: number; // Patient ID initialized on route parameter retrieval
  patient!: Patient; // Patient data retrieved from the fetch service
  dossier!: DPI; // DPI (patient record) data retrieved from the fetch service
  user = inject(UserDataService).getUserData(); // Inject and fetch user data

  router = inject(ActivatedRoute); // Inject ActivatedRoute to get route parameters
  navigation = inject(Router); // Inject Router to navigate programmatically

  ngOnInit(): void {
    // Fetch patient ID from the URL parameter
    this.router.paramMap.subscribe((params) => {
      this.id = Number(params.get("id")); // Retrieve and convert the patient ID from URL
    });

    // Fetch patient details based on the ID
    this.fetchServices.fetchPatient(this.id)
      .pipe(
        // Handle errors during fetching patient data
        catchError((err) => {
          console.error('Error fetching Patient:', err);
          // Optionally rethrow or handle the error
          throw err;
        })
      )
      .subscribe((patient) => {
        this.patient = patient; // Store the fetched patient data

        // Fetch the DPI (patient record) data after patient is retrieved
        this.fetchServices.fetchDPI(this.patient.dossier)
          .pipe(
            // Handle errors during fetching DPI data
            catchError((err) => {
              console.error('Error fetching DPI:', err);
              // Optionally rethrow or handle the error
              throw err;
            })
          )
          .subscribe((dpi) => {
            this.dossier = dpi; // Store the fetched DPI data
          });

      });

    // Test condition (just a test for decryption of colors in this case)
    if (this.id === 14) {
      console.log(`same decryption on colors down here:>>\n\n=\\i$F;FM^,:EW"u:JXb^;ahg*:JXVT74]QQ+@AFi:/=h37R]a>+@/b*+Abs3<CB8R/0IM,Eb/ZqCj@.5@;[H7+Dbt>AKZ8:FWb75Dfo]+/0K4VFWb1&DBO%0CLnW0D..6s+ED%7F<G%(AoD^$+Cf>-FD5W8ASu4"B.beh$49IFDegJ(F<G[=BlbD>EbmcDBQS?8F#ks-GB\\6\`Anbmp@4l&.D(fF2F(o9)0/$7;@;od0De:S7ARTV$5AkCMAM%V,4Y\\ND2C<N/A9)TB6Vg?UD(nk/2/6Yp/MRS>@V'Y*AS#a%FD,5.FE_XGF)59+BOu6-Bl5%;/hSbeATMQuDD*YABOPjk/hSb#+DGm>@3BE$F)u&5B-;/-ARf9oFD,*)+DGm>@VKp,@rc!p@VfUd+EVNEE,oN'BleB7EbT#lC\`me4@;od=$48IA0eb:80eb:F5%eGK9OW!a;e:&!.6K^H0JP780JP780JP790JP780Kq[>Df9E*AO^*O:3CD%.6K^I0JG170ek@90JG170ek@:0ek@:0JG180JG180JG480eb:90ek@:0eb:95!EUjFAlam-o3;74>AND0eb=90ek@90ek@90eb=90ek@90eb:80ek@:0JP780JP:90JG480eb=90JG480eb=:0JG170eb:80JG480eb=90JG480JP::0JG480ek@90eb<h$=\\."+EMI<AKYr+ARf:m+CT;%+Dkh6F(oN)+EV:8/0Je<H"(>-@V'%XF\`V+:Blk_D+CQB:AoD^&Dfg)4DBO%>E+rf++?p3HBl8#R+D5P"Bl"o*@<3Q"+D5V2A0?))Gp%3I+E2@4F(KB8AKYr4ARfFmF\`S[6EarcsG%G_I+9`);
    }
  }

  // Signals to manage visibility of patient information and antecedents
  isInformationsPatient = signal(false); // Flag for showing patient information
  isAntecedentPatient = signal(false); // Flag for showing antecedents

  // Method to update dashboard visibility
  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  // Method to handle the cancellation of actions (closing information or antecedent modals)
  annuler(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler')) {
      this.isInformationsPatient.set(false); // Close information patient modal
      this.isAntecedentPatient.set(false); // Close antecedent patient modal
    }
  }

  // Method for consultation of patient information (no additional actions)
  informationsPatient() {
    console.log("Consultation des informations du patient.");
  }

  // Method to update the antecedents of the patient
  mettreAjourAntecedent() {
    this.updateServices.modifyAntecedent(this.dossier.antecedants, this.dossier.id).subscribe({
      next: (response: any) => {
        console.log(response.user); // Log the response after updating antecedents
        alert("Les antécédants ont été modifié avec succés !!!"); // Show success message
        this.isAntecedentPatient.set(false); // Close antecedent patient modal after update
      },
      error: (error: any) => {
        console.error('Error fetching patient:', error); // Log error if updating antecedents fails
        alert("Il a eut une erreur, veuillez resaisir"); // Show error message
      }
    })
  }

  // Navigate to the consultations page
  viewConsultations() {
    this.navigation.navigate([this.user.role === 'Patient' ? 'patient' : 'medecin', 'consulter-DPI', this.id, 'consultations']);
  }
}
