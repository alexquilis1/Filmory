import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  ClientSideRowModelModule,
  ColDef,
  CsvExportModule,
  GridApi,
  GridReadyEvent,
  Module,
  ModuleRegistry
} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';
import {formatDate} from '@angular/common';

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  CsvExportModule,
]);

@Component({
  selector: 'app-watchlist-series-grid',
  imports: [AgGridAngular],
  templateUrl: './watchlist-series-grid.component.html',
  standalone: true,
  styleUrl: './watchlist-series-grid.component.css'
})
export class WatchlistSeriesGridComponent implements OnInit, OnChanges {
  @Input() rowData: any[] = [];

  public columnDefs: ColDef[] = [
    { field: 'title', headerName: 'Title', sortable: true, filter: true },
    { field: 'genres', headerName: 'Genres', sortable: true, filter: true },
    {
      field: 'firstAirDate',
      headerName: 'First Air Date',
      sortable: true,
      filter: 'agDateColumnFilter',
      valueGetter: (params) => {
        const date = params.data.firstAirDate;
        return date ? formatDate(date, 'dd-MM-yyyy', 'en-GB') : '';
      }
    },
    {
      field: 'lastAirDate',
      headerName: 'Last Air Date',
      sortable: true,
      filter: 'agDateColumnFilter',
      valueGetter: (params) => {
        const date = params.data.lastAirDate;
        return date ? formatDate(date, 'dd-MM-yyyy', 'en-GB') : '';
      }
    },
    { field: 'numberOfSeasons', headerName: 'Seasons', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'numberOfEpisodes', headerName: 'Episodes', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'voteAverage', headerName: 'Avg Vote', sortable: true, filter: 'agNumberColumnFilter' },
    {
      field: 'status',
      headerName: 'Status',
      sortable: true,
      filter: 'agSetColumnFilter',
    },
    { field: 'user_rating', headerName: 'Rating', sortable: true, filter: 'agNumberColumnFilter' },
    { field: 'comments', headerName: 'Comments', sortable: false, filter: false },
    {
      field: 'added_date',
      headerName: 'Added On',
      sortable: true,
      filter: 'agDateColumnFilter',
      valueGetter: (params) => {
        const date = params.data.added_date;
        return date ? formatDate(date, 'dd-MM-yyyy HH:mm', 'en-GB') : '';
      },
    }
  ];


  public defaultColDef: ColDef = {
    resizable: true,
    flex: 1,
    filter: true,
    sortable: true,
  };

  public modules: Module[] = [ClientSideRowModelModule, CsvExportModule];
  public gridHeight: number = 200;
  private gridApi!: GridApi;

  ngOnInit(): void {
    this.adjustGridHeight();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowData']) {
      this.adjustGridHeight();
      if (this.gridApi) {
        this.gridApi.sizeColumnsToFit();
      }
    }
  }

  onGridReady(params: GridReadyEvent): void {
    this.gridApi = params.api;
    this.adjustGridHeight();
    this.gridApi.sizeColumnsToFit();
  }

  adjustGridHeight(): void {
    const rowHeight = 48;
    const headerHeight = 56;
    const buffer = 20;
    const minRows = 3;

    const actualRows = this.rowData.length;
    const desiredRows = actualRows < minRows ? minRows : actualRows;

    this.gridHeight = headerHeight + (desiredRows * rowHeight) + buffer;
  }

  exportToCSV(): void {
    if (this.gridApi) {
      this.gridApi.exportDataAsCsv();
    }
  }

}
