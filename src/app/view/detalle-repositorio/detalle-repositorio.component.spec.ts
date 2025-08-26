import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRepositorioComponent } from './detalle-repositorio.component';

describe('DetalleRepositorioComponent', () => {
  let component: DetalleRepositorioComponent;
  let fixture: ComponentFixture<DetalleRepositorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleRepositorioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleRepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
