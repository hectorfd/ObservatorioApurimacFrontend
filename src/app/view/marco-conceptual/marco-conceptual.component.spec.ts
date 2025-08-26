import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcoConceptualComponent } from './marco-conceptual.component';

describe('MarcoConceptualComponent', () => {
  let component: MarcoConceptualComponent;
  let fixture: ComponentFixture<MarcoConceptualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarcoConceptualComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MarcoConceptualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
