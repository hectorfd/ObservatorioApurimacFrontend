import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVideoComponent } from './detalle-video.component';

describe('DetalleVideoComponent', () => {
  let component: DetalleVideoComponent;
  let fixture: ComponentFixture<DetalleVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
