import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEntidadAliadaComponent } from './crear-entidad-aliada.component';

describe('CrearEntidadAliadaComponent', () => {
  let component: CrearEntidadAliadaComponent;
  let fixture: ComponentFixture<CrearEntidadAliadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearEntidadAliadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearEntidadAliadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
