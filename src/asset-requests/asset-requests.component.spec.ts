import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetRequestsComponent } from './asset-requests.component';

describe('AssetRequestsComponent', () => {
  let component: AssetRequestsComponent;
  let fixture: ComponentFixture<AssetRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetRequestsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
