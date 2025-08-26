import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaEntidadAliadaComponent } from './lista-entidad-aliada.component';

describe('ListaEntidadAliadaComponent', () => {
  let component: ListaEntidadAliadaComponent;
  let fixture: ComponentFixture<ListaEntidadAliadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaEntidadAliadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaEntidadAliadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
