import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetSoftware } from './asset-software';

describe('AssetSoftware', () => {
  let component: AssetSoftware;
  let fixture: ComponentFixture<AssetSoftware>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetSoftware]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetSoftware);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
