import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPIPageComponent } from './dpi-page.component';

describe('DPIPageComponent', () => {
  let component: DPIPageComponent;
  let fixture: ComponentFixture<DPIPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DPIPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DPIPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
