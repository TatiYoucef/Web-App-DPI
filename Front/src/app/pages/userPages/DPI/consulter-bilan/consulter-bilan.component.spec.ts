import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterBilanComponent } from './consulter-bilan.component';

describe('ConsulterBilanComponent', () => {
  let component: ConsulterBilanComponent;
  let fixture: ComponentFixture<ConsulterBilanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterBilanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsulterBilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
