import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { Search, SearchMovie } from './app.model';
import {
  COUNTRY_API_BASE,
  FLAG_API_BASE,
  MOVIE_API_BASE,
  MOVIE_SEARCH_API_BASE,
} from './tokens';

@Injectable({
  providedIn: 'root',
})
export class AppApiService {
  constructor(
    private http: HttpClient,
    @Inject(MOVIE_SEARCH_API_BASE) private movieSearchApiBase: string,
    @Inject(MOVIE_API_BASE) private movieApiBase: string,
    @Inject(COUNTRY_API_BASE) private countryApiBase: string,
    @Inject(FLAG_API_BASE) private flagApiBase: string
  ) {}

  countryApiEnd: string = '?fullText=true';
  flagApiEnd: string = '.png';
  flag: string = '';

  searchResults: Observable<SearchMovie[]> | undefined;

  searchMovie(title: string): Observable<object> {
    this.searchResults = this.http
      .get(`${this.movieSearchApiBase}${title}`)
      .pipe(map((x: any) => x?.Search));
    return this.searchResults;
  }

  getMovie(title: string) {
    return this.http.get(`${this.movieApiBase}${title}`);
  }

  country: Observable<any> | undefined;
  currency: string[] = [];
  getCountry(name: string) {
    this.currency = [];

    this.country = this.http.get(
      `${this.countryApiBase}${name}${this.countryApiEnd}`
    );

    this.country.subscribe((x) => console.log(x));

    this.country.subscribe((x) => {
      const curr: string = Object.keys(x[0].currencies).join();
      const symbol = x[0].currencies[curr]?.symbol;
      this.currency.push(`${curr} ${symbol}`);
    });

    this.country.subscribe((country) => {
      const countryCode = country[0].cca2.toLowerCase();
      this.flag = `${this.flagApiBase}${countryCode}${this.flagApiEnd}`;
    });

    return this.country;
  }
}
