import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTableComponent } from './support-table.component';

describe('SupportTableComponent', () => {
  let component: SupportTableComponent;
  let fixture: ComponentFixture<SupportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
