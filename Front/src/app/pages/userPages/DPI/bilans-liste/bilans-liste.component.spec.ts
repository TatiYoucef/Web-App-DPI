import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BilansListeComponent } from './bilans-liste.component';

describe('BilansListeComponent', () => {
  let component: BilansListeComponent;
  let fixture: ComponentFixture<BilansListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BilansListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BilansListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
