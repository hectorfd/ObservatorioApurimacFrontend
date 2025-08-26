import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaInfografiaComponent } from './lista-infografia.component';

describe('ListaInfografiaComponent', () => {
  let component: ListaInfografiaComponent;
  let fixture: ComponentFixture<ListaInfografiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaInfografiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaInfografiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
