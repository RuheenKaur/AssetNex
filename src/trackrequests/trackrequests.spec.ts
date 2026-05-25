import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Trackrequests } from './trackrequests';

describe('Trackrequests', () => {
  let component: Trackrequests;
  let fixture: ComponentFixture<Trackrequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Trackrequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Trackrequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
