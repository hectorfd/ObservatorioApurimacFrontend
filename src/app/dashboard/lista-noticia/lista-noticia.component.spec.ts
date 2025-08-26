import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNoticiaComponent } from './lista-noticia.component';

describe('ListaNoticiaComponent', () => {
  let component: ListaNoticiaComponent;
  let fixture: ComponentFixture<ListaNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaNoticiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
