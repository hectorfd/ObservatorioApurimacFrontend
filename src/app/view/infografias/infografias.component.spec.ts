import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfografiasComponent } from './infografias.component';

describe('InfografiasComponent', () => {
  let component: InfografiasComponent;
  let fixture: ComponentFixture<InfografiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfografiasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfografiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
