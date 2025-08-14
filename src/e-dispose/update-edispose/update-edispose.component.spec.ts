import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEdisposeComponent } from './update-edispose.component';

describe('UpdateEdisposeComponent', () => {
  let component: UpdateEdisposeComponent;
  let fixture: ComponentFixture<UpdateEdisposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEdisposeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateEdisposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
