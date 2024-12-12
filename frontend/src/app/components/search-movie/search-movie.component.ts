import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForOf, NgIf, NgOptimizedImage, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-search-movie',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    SlicePipe,
  ],
  templateUrl: './search-movie.component.html',
  styleUrls: ['./search-movie.component.css'],
})
export class SearchMovieComponent implements OnInit {
  title: string | null = '';
  results: any[] = [];
  currentPage: number = 1;
  resultsPerPage: number = 6;
  paginatedResults: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.title = params.get('title');
      console.log('Movie title from URL:', this.title);
      if (this.title) {
        this.searchMovie(this.title);
      }
    });
  }

  searchMovie(title: string): void {
    const url = `http://localhost:3000/api/search-movie/${title}`;
    console.log('Fetching from:', url);
    this.http.get<any>(url).subscribe({
      next: (response) => {
        this.results = response.results || [];
        this.sortByReleaseDate(); // Sort results by release date before pagination
        this.paginateResults(); // Paginate after sorting
      },
      error: (error) => {
        console.error('Error fetching movie:', error);
      },
    });
  }

  sortByReleaseDate(): void {
    this.results.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB.getTime() - dateA.getTime(); // Sorting from newer to older
    });
  }

  paginateResults(): void {
    const startIndex = (this.currentPage - 1) * this.resultsPerPage;
    this.paginatedResults = this.results.slice(startIndex, startIndex + this.resultsPerPage);
  }

  goToNextPage(): void {
    if (this.currentPage * this.resultsPerPage < this.results.length) {
      this.currentPage++;
      this.paginateResults();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateResults();
    }
  }
}
