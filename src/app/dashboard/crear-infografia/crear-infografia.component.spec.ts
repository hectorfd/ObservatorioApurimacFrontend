import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearInfografiaComponent } from './crear-infografia.component';

describe('CrearInfografiaComponent', () => {
  let component: CrearInfografiaComponent;
  let fixture: ComponentFixture<CrearInfografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearInfografiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearInfografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
