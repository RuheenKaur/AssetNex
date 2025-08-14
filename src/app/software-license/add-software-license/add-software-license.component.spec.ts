import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoftwareLicenseComponent } from './add-software-license.component';

describe('AddSoftwareLicenseComponent', () => {
  let component: AddSoftwareLicenseComponent;
  let fixture: ComponentFixture<AddSoftwareLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSoftwareLicenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSoftwareLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
