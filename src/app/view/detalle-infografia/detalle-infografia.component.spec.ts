import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInfografiaComponent } from './detalle-infografia.component';

describe('DetalleInfografiaComponent', () => {
  let component: DetalleInfografiaComponent;
  let fixture: ComponentFixture<DetalleInfografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleInfografiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleInfografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
