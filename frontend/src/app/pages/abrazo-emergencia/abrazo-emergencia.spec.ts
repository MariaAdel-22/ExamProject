import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrazoEmergencia } from './abrazo-emergencia';

describe('AbrazoEmergencia', () => {
  let component: AbrazoEmergencia;
  let fixture: ComponentFixture<AbrazoEmergencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbrazoEmergencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbrazoEmergencia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
