import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { BilanBio, BilanRadio } from '../../../../modules/types';
import { UpdateModulesService } from '../../../../services/updateModules/update-modules.service';
import { PostModulesService } from '../../../../services/postModules/post-modules.service';

@Component({
  selector: 'app-consulter-bilan',
  standalone: true,
  imports: [LoadingScreenComponent, DashBoardComponent, HeaderComponent, FormsModule, CommonModule ],
  templateUrl: './consulter-bilan.component.html',
  styleUrl: './consulter-bilan.component.css'
})

export class ConsulterBilanComponent implements OnInit{

  isDashBoardVisible = true;

  fetchServices = inject(FetchModulesService);
  postServices = inject(PostModulesService);

  idPatient!:number ; //id patient
  idBilan!:number ; //id bilan
  isBio !: boolean;
  isFilled !: boolean;

  bilanBio!:BilanBio;
  compteRendu !: BilanRadio;


  user = inject(UserDataService).getUserData();

  router = inject(ActivatedRoute); //bihe njibou id fel path
  rout = inject(Router);
  
  ngOnInit(): void {

    this.router.paramMap.subscribe((params) =>{
      this.idPatient =Number(params.get("id1")); //id de patient récupéré
      this.idBilan =Number(params.get("id2")); //id de bilan récupéré
    });

    if(this.rout.url.includes('bio')) this.isBio = true;
    else this.isBio = false;

    if(this.isBio){

      this.fetchServices.fetchBilanBio(this.idBilan).pipe( //pipe to catch any error
        catchError((err) => {
          console.log(err);
          throw err;
        })
        ).subscribe((bil) => {
  
        this.bilanBio = bil;
        if(this.bilanBio.resultats_analytiques.length) this.isFilled = true;
        else this.isFilled = false

      });

    }else{

      this.fetchServices.fetchBilanRadio(this.idBilan).pipe( //pipe to catch any error
        catchError((err) => {
          console.log(err);
          throw err;
        })
        ).subscribe((rad) => {
  
        this.compteRendu = rad;
        this.isFilled = true

      });

    }
    

  }

  updateDashboardVisibility(isVisible: boolean) {
    this.isDashBoardVisible = isVisible;
  }

  addTest(){

    this.bilanBio.resultats_analytiques.push({
      id:0,
      parametre:'',
      value:null,
      unite:""
    })

  }

  removeTest(index:number){

    this.bilanBio.resultats_analytiques.splice(index, 1);

  }

  testIfAllFilled(){

    let isRempli = true;
    this.bilanBio.resultats_analytiques.forEach((test) => {

      if( !test.parametre || !test.unite){
        isRempli = false;
        alert("Envoi interrompu, vous n'avez pas rempli tous les cases vides, vérifier ligne" + this.bilanBio.resultats_analytiques.indexOf(test) + 1)
      }

    })

    if(!this.bilanBio.resultats_analytiques.length){
      isRempli = false;
      alert("Vous devez remplir au moins un seul avant l'envoi");
    }

    return isRempli;

  }

  patchBilan(){
    console.log("Bilan updated to", this.bilanBio);

    if(this.testIfAllFilled()){

      this.postServices.createTestsInBio(this.bilanBio.resultats_analytiques, this.bilanBio.id).subscribe({
        next: (response:any)=>{
          console.log(response) 
          alert("Bilan biologique est envoyé au laborantin !");
          this.rout.navigate(['medecin/consulter-DPI',this.idPatient,'Bilans'])
        },

        error : (error: any) =>{
          console.error('Error fetching bil:', error);
          alert("Il a eut un problème de saisie, veuillez ajouter correctement le saisie")
        }

      })

    }

  }
}
