import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleEntidadAliadaComponent } from './detalle-entidad-aliada.component';

describe('DetalleEntidadAliadaComponent', () => {
  let component: DetalleEntidadAliadaComponent;
  let fixture: ComponentFixture<DetalleEntidadAliadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleEntidadAliadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleEntidadAliadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
