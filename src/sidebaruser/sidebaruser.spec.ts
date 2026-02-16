import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebaruser } from './sidebaruser';

describe('Sidebaruser', () => {
  let component: Sidebaruser;
  let fixture: ComponentFixture<Sidebaruser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebaruser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidebaruser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
