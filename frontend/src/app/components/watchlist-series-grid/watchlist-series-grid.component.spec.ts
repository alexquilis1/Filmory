import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistSeriesGridComponent } from './watchlist-series-grid.component';

describe('WatchlistSeriesGridComponent', () => {
  let component: WatchlistSeriesGridComponent;
  let fixture: ComponentFixture<WatchlistSeriesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistSeriesGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistSeriesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
