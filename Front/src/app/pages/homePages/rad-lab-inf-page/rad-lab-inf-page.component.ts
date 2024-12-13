import { Component, inject, OnInit, signal } from '@angular/core';
import { FetchModulesService } from '../../../services/fetch-modules.service';
import { Patient } from '../../../modules/types';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-rad-lab-inf-page',
  standalone: true,
  imports: [],
  templateUrl: './rad-lab-inf-page.component.html',
  styleUrl: './rad-lab-inf-page.component.css'
})

export class RadLabInfPageComponent implements OnInit{
  fetchServices = inject(FetchModulesService);
  listePatient = signal<Array<Patient>>([]);

  ngOnInit(): void { //when this page load, we fetch the list of patients
      
    this.fetchServices.fetchListePatient().pipe( //pipe to catch any error
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((liste) => {
      this.listePatient.set(liste);
    })
  }
  
}
