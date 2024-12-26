import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSoinComponent } from './ajout-soin.component';

describe('AjoutSoinComponent', () => {
  let component: AjoutSoinComponent;
  let fixture: ComponentFixture<AjoutSoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutSoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutSoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
