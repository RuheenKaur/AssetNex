import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareLicenseComponent } from './software-license.component';

describe('SoftwareLicenseComponent', () => {
  let component: SoftwareLicenseComponent;
  let fixture: ComponentFixture<SoftwareLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoftwareLicenseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
