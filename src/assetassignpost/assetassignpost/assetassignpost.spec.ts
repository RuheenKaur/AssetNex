import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Assetassignpost } from './assetassignpost';

describe('Assetassignpost', () => {
  let component: Assetassignpost;
  let fixture: ComponentFixture<Assetassignpost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Assetassignpost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Assetassignpost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
