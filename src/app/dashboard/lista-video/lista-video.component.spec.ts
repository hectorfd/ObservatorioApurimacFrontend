import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVideoComponent } from './lista-video.component';

describe('ListaVideoComponent', () => {
  let component: ListaVideoComponent;
  let fixture: ComponentFixture<ListaVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListaVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
