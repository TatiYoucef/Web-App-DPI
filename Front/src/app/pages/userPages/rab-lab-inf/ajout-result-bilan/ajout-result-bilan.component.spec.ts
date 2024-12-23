import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutResultBilanComponent } from './ajout-result-bilan.component';

describe('AjoutResultBilanComponent', () => {
  let component: AjoutResultBilanComponent;
  let fixture: ComponentFixture<AjoutResultBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutResultBilanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutResultBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
