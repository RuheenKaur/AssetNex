import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAssetrequests } from './admin-assetrequests';

describe('AdminAssetrequests', () => {
  let component: AdminAssetrequests;
  let fixture: ComponentFixture<AdminAssetrequests>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAssetrequests]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAssetrequests);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
