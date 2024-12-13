import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedecinComponent } from './medecin.component';

describe('MedecinComponent', () => {
  let component: MedecinComponent;
  let fixture: ComponentFixture<MedecinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedecinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedecinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
