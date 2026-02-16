import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersPost } from './userspost';

describe('Userspost', () => {
  let component: UsersPost;
  let fixture: ComponentFixture<UsersPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
