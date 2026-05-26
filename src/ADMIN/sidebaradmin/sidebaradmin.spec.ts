import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebaradmin } from './sidebaradmin';

describe('Sidebaradmin', () => {
  let component: Sidebaradmin;
  let fixture: ComponentFixture<Sidebaradmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebaradmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidebaradmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
