import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {NgForOf, NgIf, NgOptimizedImage, SlicePipe} from '@angular/common';

@Component({
  selector: 'app-search-tv-series',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SlicePipe
  ],
  templateUrl: './search-series.component.html',
  styleUrls: ['./search-series.component.css']
})
export class SearchSeriesComponent implements OnInit {
  title: string | null = '';
  results: any[] = [];
  currentPage: number = 1;
  resultsPerPage: number = 6;  // Change this value as needed
  paginatedResults: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.title = params.get('title');
      if (this.title) {
        this.searchTVSeries(this.title);
      }
    });
  }

  searchTVSeries(title: string): void {
    const url = `http://localhost:3000/api/search-series/${title}`
    console.log('Fecthing from:', url)
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.results = response.results || [];
        this.sortByFirstAirDate(); // Sort results by release date before pagination
        this.paginateResults(); // Paginate after sorting
      },
      error: (error) => {
        console.error('Error fetching movie:', error);
      },
    })
  }

  sortByFirstAirDate(): void {
    this.results.sort((a, b) => {
      const dateA = new Date(a.first_air_date);
      const dateB = new Date(b.first_air_date);
      return dateB.getTime() - dateA.getTime(); // Sorting from newer to older
    });
  }

  paginateResults(): void {
    const startIndex = (this.currentPage - 1) * this.resultsPerPage;
    const endIndex = startIndex + this.resultsPerPage;
    this.paginatedResults = this.results.slice(startIndex, endIndex);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateResults();
    }
  }

  goToNextPage(): void {
    const totalPages = Math.ceil(this.results.length / this.resultsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.paginateResults();
    }
  }
}
