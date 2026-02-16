import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutadmin } from './layoutadmin';

describe('Layoutadmin', () => {
  let component: Layoutadmin;
  let fixture: ComponentFixture<Layoutadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layoutadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layoutadmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
