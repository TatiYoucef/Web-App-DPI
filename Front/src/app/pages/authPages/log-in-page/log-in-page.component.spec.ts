import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInPageComponent } from './log-in-page.component';
import { FormsModule } from '@angular/forms';
describe('LogInPageComponent', () => {
  let component: LogInPageComponent;
  let fixture: ComponentFixture<LogInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogInPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
