import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UinewComponent } from './uinew.component';

describe('UinewComponent', () => {
  let component: UinewComponent;
  let fixture: ComponentFixture<UinewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UinewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UinewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
