import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  reduce,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { AppApiService } from '../app-api.service';
import { Country, Movie, SearchMovie } from '../app.model';

@Component({
  selector: 'app-combined-stats',
  templateUrl: './combined-stats.component.html',
  styleUrls: ['./combined-stats.component.scss'],
})
export class CombinedStatsComponent {
  constructor(public apiService: AppApiService) {}

  search1 = '';
  search2 = '';
  search3 = '';

  combinedRuntime$: Observable<number> | undefined;
  country$: Observable<Country[]> | undefined;
  getData() {
    this.combinedRuntime$ = this.apiService.getMovie(this.search1).pipe(
      map((movie) => Number.parseInt(movie.Runtime)),
      switchMap((result1) =>
        this.apiService.getMovie(this.search2).pipe(
          map((movie) => Number.parseInt(movie.Runtime)),
          switchMap((result2) =>
            this.apiService.getMovie(this.search3).pipe(
              map((movie) => Number.parseInt(movie.Runtime)),
              map((result3) => result1 + result2 + result3)
            )
          )
        )
      )
    );

    this.apiService
      .getMovie(this.search1)
      .pipe(
        switchMap((movie) =>
          of(movie.Country.split(', ')).pipe(
            // tap((x) => console.log(x)),
            switchMap((countries1) =>
              this.apiService.getMovie(this.search2).pipe(
                switchMap((movie) =>
                  of(movie.Country.split(', ')).pipe(
                    // tap((x) => console.log(x)),
                    switchMap((countries2) =>
                      this.apiService.getMovie(this.search3).pipe(
                        switchMap((movie) =>
                          of(movie.Country.split(', ')).pipe(
                            // tap((x) => console.log(x)),
                            map((countries3) =>
                              countries1.concat(countries2, countries3)
                            ),
                            map((countries) => Array.from(new Set(countries)))
                          )
                        )
                      )
                    )
                  )
                )
              )
            )
          )
        )
      )
      .subscribe((x) =>
        x.forEach((country) => this.apiService.getCountry(country))
      );
  }

  toZero() {
    this.apiService.populationSum = '';
  }
}
