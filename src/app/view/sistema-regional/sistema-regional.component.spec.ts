import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SistemaRegionalComponent } from './sistema-regional.component';

describe('SistemaRegionalComponent', () => {
  let component: SistemaRegionalComponent;
  let fixture: ComponentFixture<SistemaRegionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SistemaRegionalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SistemaRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
