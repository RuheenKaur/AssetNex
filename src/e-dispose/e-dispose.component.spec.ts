import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EDisposeComponent } from './e-dispose.component';

describe('EDisposeComponent', () => {
  let component: EDisposeComponent;
  let fixture: ComponentFixture<EDisposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EDisposeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EDisposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
