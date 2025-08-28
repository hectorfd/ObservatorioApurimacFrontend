import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonasDesaparecidasComponent } from './personas-desaparecidas.component';

describe('PersonasDesaparecidasComponent', () => {
  let component: PersonasDesaparecidasComponent;
  let fixture: ComponentFixture<PersonasDesaparecidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonasDesaparecidasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PersonasDesaparecidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
