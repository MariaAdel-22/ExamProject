import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaAtras } from './cuenta-atras';

describe('CuentaAtras', () => {
  let component: CuentaAtras;
  let fixture: ComponentFixture<CuentaAtras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaAtras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaAtras);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
