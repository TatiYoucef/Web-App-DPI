import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenererGraphComponent } from './generer-graph.component';

describe('GenererGraphComponent', () => {
  let component: GenererGraphComponent;
  let fixture: ComponentFixture<GenererGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenererGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenererGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
