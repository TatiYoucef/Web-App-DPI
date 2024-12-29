import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsulterDPIComponent } from './consulter-dpi.component';

describe('ConsulterDPIComponent', () => {
  let component: ConsulterDPIComponent;
  let fixture: ComponentFixture<ConsulterDPIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsulterDPIComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsulterDPIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
