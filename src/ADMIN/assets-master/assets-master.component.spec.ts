import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMasterComponent } from './assets-master.component';

describe('AssetsMasterComponent', () => {
  let component: AssetsMasterComponent;
  let fixture: ComponentFixture<AssetsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsMasterComponent]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AssetsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
