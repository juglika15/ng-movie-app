import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, Observable } from 'rxjs';
import { AppApiService } from '../app-api.service';
import { Movie, SearchMovie } from '../app.model';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent {
  constructor(public apiService: AppApiService) {}

  search = new FormControl();
  searchTitle$: Observable<string> | undefined;
  searchResults$: Observable<SearchMovie[]> | undefined;

  showMovie = false;

  ngOnInit() {
    this.searchTitle$ = this.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
    this.searchTitle$.subscribe((title: string) => {
      if (title.length >= 3) {
        this.showMovie = false;

        this.searchResults$ = this.apiService
          .searchMovie(title)
          .pipe(map((x: any) => x?.Search));
      }
    });
  }

  result$: Observable<Movie> | undefined;

  findMovie(title: string | undefined) {
    if (title) this.result$ = this.apiService.getMovie(title);
    this.search.setValue('');
    this.showMovie = true;
    this.result$?.subscribe((movie) =>
      movie?.Country.split(', ').forEach((country: string) =>
        this.apiService.getCountry(country)
      )
    );
  }

  releace(releaceYear: string) {
    const year = new Date().getFullYear();
    const dashIndex = releaceYear.indexOf('–');
    if (dashIndex > 0) {
      return year - +releaceYear.slice(0, dashIndex);
    } else return year - +releaceYear;
  }
}
