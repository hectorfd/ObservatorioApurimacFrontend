import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEntidadAliadaComponent } from './editar-entidad-aliada.component';

describe('EditarEntidadAliadaComponent', () => {
  let component: EditarEntidadAliadaComponent;
  let fixture: ComponentFixture<EditarEntidadAliadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEntidadAliadaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarEntidadAliadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
