import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { BilanBio, BilanRadio } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdateModulesService } from '../../../../services/updateModules/update-modules.service';

@Component({
  selector: 'app-ajout-result-bilan',
  standalone: true,
  imports: [LoadingScreenComponent, HeaderComponent, DashBoardComponent, CommonModule, FormsModule],
  templateUrl: './ajout-result-bilan.component.html',
  styleUrl: './ajout-result-bilan.component.css'
})

export class AjoutResultBilanComponent implements OnInit {

  isDashBoardVisible = true;

  user = inject(UserDataService).getUserData();

  id!: number;
  idP!: number;
  router = inject(ActivatedRoute); //bihe njibou id fel path
  rout = inject(Router);

  fetchServices = inject(FetchModulesService);
  updateServices = inject(UpdateModulesService);
  listTestsBilan !: BilanBio; // liste des demandes de tests pour un bilan
  compteRendu !: BilanRadio ;
  length = 0;

  ngOnInit(): void {

    this.router.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); //id de patient récupéré
      this.idP = Number(params.get("idP"));
    });

    if(this.user.role === 'Radiologue'){ //ida radiologue, request radiological bilan

      this.fetchServices.fetchListeBilanRadioIncompleted(this.id).pipe( //pipe to catch any error
        catchError((err) => {
          console.log(err);
          throw err;
        })
        ).subscribe((liste) => {
  
        if(liste.length) this.compteRendu = liste[0];
        this.length = liste.length;

      })

    } else { // sinon, fetch biologique

      this.fetchServices.fetchListeBilanBioIncompleted(this.id).pipe( //pipe to catch any error
        catchError((err) => {
          console.log(err);
          throw err;
        })
        ).subscribe((liste) => {
  
        if(liste.length) this.listTestsBilan = liste[0];
        this.length = liste.length;

      })

    }

    
      
  }

  enregistrerBilan(){

    if(this.user.role === 'Radiologue'){

      this.updateServices.ajoutComptRenduForPatient(this.compteRendu.compte_rendu, this.compteRendu.id).subscribe({
        next: (response:any)=>{
          console.log(response) 
          alert("Bilan radiologique est sauvegardé !")
          this.rout.navigate(['rabLabInf', this.idP]); 
        },

        error : (error: any) =>{
          console.error('Error fetching patient:', error);
          alert("Il a eut un problème de saisie, veuillez ajouter correctement le saisie")
        }

      })

    } else {

      this.updateServices.ajoutResultsBioForPatient(this.listTestsBilan.resultats_analytiques, this.listTestsBilan.id).subscribe({
        next: (response:any)=>{
          console.log(response) 
          alert("Bilan biologique est sauvegardé !")
          this.rout.navigate(['rabLabInf', this.idP]); 
        },

        error : (error: any) =>{
          console.error('Error fetching patient:', error);
          alert("Il a eut un problème de saisie, veuillez ajouter correctement le saisie")
        }

      })

    }

  }
    
  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }
  //Hade la partie te3 gestion de fichier, modify it CAREFULLY


  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Access the hidden input te3 page

  selectedFile: File | null = null; //fichier li kheyrou user
  previewUrl: string | null = null; //url pour ce file ida exista


  triggerFileInput(): void {
    this.fileInput.nativeElement.click(); // Programmatically trigger the hidden <input>
  }

  removeFile(): void{
    this.selectedFile = null;
    this.previewUrl = null;
  }

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      const file = input.files[0];

      // Validate file extension
      const validExtensions = ['jpg', 'jpeg', 'png'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension && validExtensions.includes(fileExtension)) { //ida tout est valide

        this.selectedFile = file;
        this.previewFile(file);

      } else {

        alert("Fichier invalide. S'il vous plait selectionnez une photo");
        this.selectedFile = null;
        this.previewUrl = null;

      }

    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

}
