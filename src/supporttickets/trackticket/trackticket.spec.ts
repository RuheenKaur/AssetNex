import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trackticket } from './trackticket';

describe('Trackticket', () => {
  let component: Trackticket;
  let fixture: ComponentFixture<Trackticket>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trackticket]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trackticket);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
