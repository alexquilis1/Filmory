import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistChartComponent } from './watchlist-chart.component';

describe('WatchlistChartComponent', () => {
  let component: WatchlistChartComponent;
  let fixture: ComponentFixture<WatchlistChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
