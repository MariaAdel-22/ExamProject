import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicaParaTi } from './musica-para-ti';

describe('MusicaParaTi', () => {
  let component: MusicaParaTi;
  let fixture: ComponentFixture<MusicaParaTi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicaParaTi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicaParaTi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
