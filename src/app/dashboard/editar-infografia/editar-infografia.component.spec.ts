import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInfografiaComponent } from './editar-infografia.component';

describe('EditarInfografiaComponent', () => {
  let component: EditarInfografiaComponent;
  let fixture: ComponentFixture<EditarInfografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarInfografiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarInfografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
