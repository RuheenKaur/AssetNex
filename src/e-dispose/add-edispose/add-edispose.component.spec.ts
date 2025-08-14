import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEdisposeComponent } from './add-edispose.component';

describe('AddEdisposeComponent', () => {
  let component: AddEdisposeComponent;
  let fixture: ComponentFixture<AddEdisposeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEdisposeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEdisposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
