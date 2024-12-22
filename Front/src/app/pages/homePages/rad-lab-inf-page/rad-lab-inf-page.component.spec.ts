import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadLabInfPageComponent } from './rad-lab-inf-page.component';

describe('RadLabInfPageComponent', () => {
  let component: RadLabInfPageComponent;
  let fixture: ComponentFixture<RadLabInfPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadLabInfPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RadLabInfPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
