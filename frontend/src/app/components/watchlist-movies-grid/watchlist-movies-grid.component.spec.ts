import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchlistMoviesGridComponent } from './watchlist-movies-grid.component';

describe('WatchlistMoviesGridComponent', () => {
  let component: WatchlistMoviesGridComponent;
  let fixture: ComponentFixture<WatchlistMoviesGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WatchlistMoviesGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchlistMoviesGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
