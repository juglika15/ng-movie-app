import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  catchError,
  from,
  map,
  Observable,
  of,
  reduce,
  switchMap,
  tap,
} from 'rxjs';
import { Country, Movie, Search, SearchMovie } from './app.model';
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
  countries = [{ country: '', flag: '' }];

  searchMovie(title: string): Observable<Search> {
    return this.http.get<Search>(`${this.movieSearchApiBase}${title}`);
  }

  getMovie(title: string) {
    return this.http.get<Movie>(`${this.movieApiBase}${title}`);
  }

  country: Observable<Country[]> | undefined;
  currency: string[] = [];
  population: number[] = [];
  populationSum: string = '';

  getCountry(name: string) {
    this.currency = [];
    this.population = [];

    this.country = this.http.get<Country[]>(
      `${this.countryApiBase}${name}${this.countryApiEnd}`
    );

    this.country?.subscribe((x) => {
      this.population.push(x[0].population);
      if (this.population.length) {
        this.populationSum = this.population
          .reduce((acc, curr) => curr + acc, 0)
          .toLocaleString('en');
      }
    });

    this.country.subscribe((x: Country[]) => {
      const curr: string = Object.keys(x[0].currencies).join();
      const symbol: string = x[0].currencies[curr]?.symbol;
      this.currency.push(`${curr} ${symbol}`);
    });

    this.countries = [{ country: '', flag: '' }];
    this.country.subscribe((country) => {
      const countryCode = country[0].cca2.toLowerCase();

      this.countries.push({
        country: country[0].name.common,
        flag: `${this.flagApiBase}${countryCode}${this.flagApiEnd}`,
      });
    });

    return this.http.get<Country[]>(
      `${this.countryApiBase}${name}${this.countryApiEnd}`
    );
  }
}
