import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPatientsComponent } from './gestion-patients.component';

describe('GestionPatientsComponent', () => {
  let component: GestionPatientsComponent;
  let fixture: ComponentFixture<GestionPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPatientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
