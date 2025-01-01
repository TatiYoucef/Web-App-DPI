import { Component, inject, OnInit, signal } from '@angular/core';
import { UserDataService } from '../../../../services/userData/user-data.service';
import { LoadingScreenComponent } from "../../../../components/loading-screen/loading-screen.component";
import { DashBoardComponent } from "../../../../components/dash-board/dash-board.component";
import { HeaderComponent } from "../../../../components/header-user/header.component";
import { Soin } from '../../../../modules/types';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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
  id!:number;
  router = inject(ActivatedRoute); //bihe njibou id fel path

  updateDashboardVisibility(isVisible: boolean) {
    console.log('Dashboard visibility updated:', isVisible);
    this.isDashBoardVisible = isVisible;
  }

  ngOnInit(): void { //nrecupriwi id te3 patient 

    this.router.paramMap.subscribe((params) =>{
      this.id = Number(params.get("id")); //id de patient récupéré
    });

    console.log(this.id);
  }

  listeSoin = signal<Array<Soin>>([{
    id: 0,
    description: '',
    subject: '',
    date: Date.now().toString()
  }]);

  addSoin(){

    if (this.listeSoin()[this.listeSoin().length - 1].description != "" 
    && this.listeSoin()[this.listeSoin().length - 1].subject != "") { //ida koullesh t3emmer, tesra interaction

      this.listeSoin.update( (e) => {
        e.push({
          id: 0,
          description: '',
          subject: '',
          date: Date.now().toString()
        }); 

        return e;
      })
    }

  }

  removeSoin(index:number){
    this.listeSoin.update((e) =>{
      e.splice(index, 1);
      return e;
    })
  }

  sauvegarder(){
    console.log(this.listeSoin());
  }

}
