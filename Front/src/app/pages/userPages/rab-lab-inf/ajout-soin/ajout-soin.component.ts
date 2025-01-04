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

  isDashBoardVisible = true;
  
  user = inject(UserDataService).getUserData() //Njibou Data te3 user te3na
  fetchServices = inject(FetchModulesService)
  updateServices = inject(UpdateModulesService);
  id!:number;
  idP!: number
  router = inject(ActivatedRoute); //bihe njibou id fel path
  rout = inject(Router);

  oldListe !: Array<Soin>;
  newListe !: Array<Soin>;
  removedIds:Array<number> = [];

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  ngOnInit(): void { //nrecupriwi id te3 patient 

    this.router.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); //id de patient récupéré
      this.idP = Number(params.get("idP"));
    });

    this.fetchServices.fetchLatestListSoin(this.id).pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((liste) => {

      this.oldListe = liste;
      this.newListe = this.oldListe;
      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' is the ISO date format (yyyy-mm-dd)
      console.log(formattedDate); // e.g., "2025-01-04"
      
      this.newListe.push({
        id: 0, //id 0 pour detecter aprés les nouveaux éléments
        infirmier:this.user.id,
        description: '',
        subject: '',
        date: formattedDate,
      });

    })

  }

  addSoin(){

    if (this.newListe[this.newListe.length - 1].description != "" 
    && this.newListe[this.newListe.length - 1].subject != "") { //ida koullesh t3emmer, tesra interaction

      const date = new Date();
      const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' is the ISO date format (yyyy-mm-dd)

      this.newListe.push({
        id: 0, //id 0 pour detecter aprés les nouveaux éléments
        infirmier:this.user.id,
        description: '',
        subject: '',
        date: formattedDate,
      });
      
    }

  }

  removeSoin(index:number){

    this.removedIds.push(this.newListe[index].id);
    this.newListe.splice(index, 1);


  }

  testIsFilled(){

    let isAllFilled = true;

    this.newListe.forEach((soin) => {

      if( !soin.description  || !soin.subject ){ //ida kayen un vide
          
        alert(`Veuillez remplir les données de soin ${this.newListe.indexOf(soin) + 1}`);
        isAllFilled = false
  
      }
    })

    return isAllFilled;

  }

  sauvegarder(){
    
    if( this.testIsFilled() ){ //ida koullesh t3emmer

      type dataSoin = {
        id?: number; // Optional because new soins may not have an ID yet
        infirmier: number,
        subject: String,
        description: String, 
        date: String,
      };
      type Change = {
        add: Array<dataSoin> ,  // Array of new soins to add
        remove: Array<number>,  // Array of soin ids to remove
        update: Array<dataSoin>  // Array of updated soins
      };
        
      let changes : Change = {
        add: [],
        remove: [],
        update: [],
      };
  
      this.newListe.forEach((soin) => {
        
        if(soin.id === 0){ //totally new

          changes.add.push({
            infirmier: soin.infirmier,
            subject: soin.subject,
            description: soin.description,
            date: soin.date
          });

        } else if(this.oldListe.indexOf(soin) >= 0){ //exists already, tsemma update

          changes.update.push({
            id: soin.id,
            infirmier: soin.infirmier,
            subject: soin.subject,
            description: soin.description,
            date: soin.date
          })

        }

      })

      this.removedIds.filter((id) => id!=0);
      changes.remove = this.removedIds;
      console.log(changes);

      this.updateServices.modifyLatesSoinList(changes, this.id).subscribe({
        next: (response:any)=>{
          console.log(response) 
          alert("La liste des soins est sauvegardé !")
          this.rout.navigate(['rabLabInf', this.idP]); 
        },

        error : (error: any) =>{
          console.error('Error fetching:', error);
          alert("Il a eut un problème de saisie, veuillez ajouter correctement le saisie")
        }

      });

    }
    

  }

}
