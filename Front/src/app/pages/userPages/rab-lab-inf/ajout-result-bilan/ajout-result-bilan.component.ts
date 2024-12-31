import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { TestBilan } from '../../../../modules/types';
import { FetchModulesService } from '../../../../services/fetchModules/fetch-modules.service';
import { catchError } from 'rxjs';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ajout-result-bilan',
  standalone: true,
  imports: [LoadingScreenComponent, HeaderComponent, DashBoardComponent, CommonModule],
  templateUrl: './ajout-result-bilan.component.html',
  styleUrl: './ajout-result-bilan.component.css'
})

export class AjoutResultBilanComponent implements OnInit {

  isDashBoardVisible = true;

  user = inject(UserDataService).getUserData();

  id!: number;
  router = inject(ActivatedRoute); //bihe njibou id fel path

  fetchServices = inject(FetchModulesService);
  listTestsBilan = signal<Array<TestBilan>>([]); // liste des demandes de tests pour un bilan

  ngOnInit(): void {

    this.fetchServices.fetchListeTestsBilan().pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
      ).subscribe((liste: any) => {

      this.listTestsBilan.set(liste.tests);
    })

    this.router.paramMap.subscribe((params) =>{
      this.id =Number(params.get("id")); //id de patient récupéré
    });

    console.log(this.id);
      
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
