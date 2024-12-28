import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdonnancesAccueilComponent } from './ordonnances-accueil.component';

describe('OrdonnancesAccueilComponent', () => {
  let component: OrdonnancesAccueilComponent;
  let fixture: ComponentFixture<OrdonnancesAccueilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdonnancesAccueilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdonnancesAccueilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});