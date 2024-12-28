import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import { WatchlistItem } from '../../models/watchlist-item.model';
import { HighchartsChartModule } from 'highcharts-angular';

interface ChartData {
  name: string;
  y: number;
}

@Component({
  selector: 'app-watchlist-chart',
  templateUrl: './watchlist-chart.component.html',
  styleUrls: ['./watchlist-chart.component.css'],
  standalone: true,
  imports: [HighchartsChartModule]
})
export class WatchlistChartComponent implements OnChanges {
  @Input() watchlist: WatchlistItem[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Movies vs TV-Series',
    },
    xAxis: {
      categories: [],
      title: {
        text: 'Category',
      },
    },
    yAxis: {
      min: 0,
      tickInterval: 1,
      title: {
        text: 'Number of Items',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' items'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true
        },
        colorByPoint: true
      }
    },
    colors: ['#FF6384', '#36A2EB'],
    series: [
      {
        name: 'Categories',
        type: 'bar',
        data: []
      }
    ]
  };

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['watchlist']) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    const totalMovies = this.watchlist.filter(item => item.type === 'movie').length;
    const totalTVSeries = this.watchlist.filter(item => item.type === 'tv').length;

    const data: ChartData[] = [
      { name: 'Movies', y: totalMovies },
      { name: 'TV-Series', y: totalTVSeries }
    ];

    this.chartOptions = {
      ...this.chartOptions,
      xAxis: {
        ...this.chartOptions.xAxis,
        categories: data.map(item => item.name)
      },
      series: [
        {
          name: 'Categories',
          type: 'bar',
          data: data.map(item => item.y)
        }
      ]
    };
  }
}
