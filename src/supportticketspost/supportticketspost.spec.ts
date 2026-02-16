import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketsPost } from './supportticketspost';

describe('Supportticketspost', () => {
  let component: SupportTicketsPost;
  let fixture: ComponentFixture<SupportTicketsPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportTicketsPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportTicketsPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
