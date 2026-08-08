import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbrirCuando } from './abrir-cuando';

describe('AbrirCuando', () => {
  let component: AbrirCuando;
  let fixture: ComponentFixture<AbrirCuando>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbrirCuando]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbrirCuando);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
