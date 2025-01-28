import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { Medicament, Ordonnance, Patient } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { PostModulesService } from '../../../../services/postModules/post-modules.service';
import { UpdateModulesService } from '../../../../services/updateModules/update-modules.service';


@Component({
  selector: 'app-ordonnances-accueil',
  standalone: true,
  imports: [HeaderComponent, DashBoardComponent, LoadingScreenComponent, CommonModule, FormsModule],
  templateUrl: './ordonnances-accueil.component.html',
  styleUrl: './ordonnances-accueil.component.css'
})
export class OrdonnancesAccueilComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  router = inject(Router);
  isDashBoard = signal(false);
  user = inject(UserDataService).getUserData();

  fetchServices = inject(FetchModulesService);
  postServices = inject(PostModulesService);
  updateServices = inject(UpdateModulesService)

  isDashBoardVisible = true;
  isAjoutOrdonnance = false;
  isAjoutMedicament = false;

  ordonnances !: Array<Ordonnance>;
  patient !: Patient;
  id !: number ;
  idOrdo: number = 0;

  newMed = {
    nom:"",
    dose:"",
    frequence:""
  }

  newOrdonnance = {
    medicaments: [],
    date: "",
    duree: "",
    etat: false,
    medcin: this.user.id
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); //id de patient récupéré
    });

    this.fetchServices.fetchPatient(this.id)
    .pipe(
      // Use catchError to handle errors
      catchError((err) => {
        console.error('Error fetching Patient:', err);
        // Optionally rethrow or handle the error
        throw err;
      })
    )
    .subscribe((patient) => {
      this.patient = patient;
    })

    this.fetchServices.fetchListeOrdonnances(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe(async (liste) => {
    
      this.ordonnances = liste;  
      this.ordonnances.reverse();

    })

  }

  changeDashState(){
    this.isDashBoard.update((e) => !e);
  }

  annuler(event: MouseEvent){

    if ((event.target as HTMLElement).classList.contains('grey-div') || (event.target as HTMLElement).classList.contains('annuler') ) {
      this.isAjoutOrdonnance= false;
      this.isAjoutMedicament= false;
    }
    
  }

  ajoutOrdonnance(){
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' is the ISO date format (yyyy-mm-dd)

    this.newOrdonnance.date = formattedDate;

    if(!this.newOrdonnance.duree){
      alert("Veuillez remplir la durée de cette ordonnace")
    } else {
      this.postServices.createOrdonnance(this.newOrdonnance, this.patient.dossier);
      this.isAjoutOrdonnance = false;

      this.fetchServices.fetchListeOrdonnances(this.id).pipe( //pipe to catch any error
        catchError((err) => {
          console.log(err);
          throw err;
        })
        ).subscribe(async (liste) => {
      
        this.ordonnances = liste;  
        this.ordonnances.reverse();
  
      })

      this.newOrdonnance = {
        medicaments: [],
        date: "",
        duree: "",
        etat: false,
        medcin: this.user.id
      }

    }

  }

  ajoutMedicament(idOrdo:number){

    if(!this.newMed.nom || !this.newMed.dose ||!this.newMed.frequence ){
      
      alert("Veuillez remplir la durée les vides pour ajouter un médicament")
    
    }else{

      this.updateServices.addMedicammentToOrdonnace([this.newMed], idOrdo).subscribe({
        next: (response:any)=>{
          console.log(response.user);
          alert("Le nouveau médicament a été ajouté !!!");
          this.isAjoutMedicament = false;

          this.fetchServices.fetchListeOrdonnances(this.id).pipe( //pipe to catch any error
            catchError((err) => {
              console.log(err);
              throw err;
            })
            ).subscribe(async (liste) => {
          
            this.ordonnances = liste;  
            this.ordonnances.reverse();
          })

          this.newMed = {
            nom:"",
            dose:"",
            frequence:""
          }
        
        },
  
        error : (error: any) =>{
          console.error('Error fetching med:', error);
          alert("Il a eut une erreur, veuillez resaisir")
        }
  
      })

    }
  }

}
