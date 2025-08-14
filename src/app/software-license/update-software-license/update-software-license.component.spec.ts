import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSoftwareLicenseComponent } from './update-software-license.component';

describe('UpdateSoftwareLicenseComponent', () => {
  let component: UpdateSoftwareLicenseComponent;
  let fixture: ComponentFixture<UpdateSoftwareLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSoftwareLicenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSoftwareLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
