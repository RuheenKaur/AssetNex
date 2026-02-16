import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketsComponent } from './supporttickets.component';

describe('DashboardUserFormsComponent', () => {
  let component: SupportTicketsComponent;
  let fixture: ComponentFixture<SupportTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportTicketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
