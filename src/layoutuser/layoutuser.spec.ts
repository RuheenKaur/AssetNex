import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Layoutuser } from './layoutuser';

describe('Layoutuser', () => {
  let component: Layoutuser;
  let fixture: ComponentFixture<Layoutuser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layoutuser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Layoutuser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
