import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterBilanBioComponent } from './consulter-bilan-bio.component';

describe('ConsulterBilanBioComponent', () => {
  let component: ConsulterBilanBioComponent;
  let fixture: ComponentFixture<ConsulterBilanBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterBilanBioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsulterBilanBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
