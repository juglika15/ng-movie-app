import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinedStatsComponent } from './combined-stats.component';

describe('CombinedStatsComponent', () => {
  let component: CombinedStatsComponent;
  let fixture: ComponentFixture<CombinedStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombinedStatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombinedStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
