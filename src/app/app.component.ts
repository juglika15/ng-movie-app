import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Observable, Subscription, tap } from 'rxjs';
import { AppApiService } from './app-api.service';
import { Movie } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public appApiService: AppApiService) {}

  search = new FormControl();
  searchTitle: Observable<string> | undefined;
  showMovie = false;
  year = new Date().getFullYear();

  ngOnInit() {
    this.searchTitle = this.search.valueChanges.pipe(debounceTime(500));
    this.searchTitle.subscribe((title: string) => {
      if (title.length >= 3) {
        this.showMovie = false;

        this.appApiService.searchMovie(title);
      }
    });
  }
  result: Observable<any> | undefined;
  findMovie(title: string | undefined) {
    if (title) this.result = this.appApiService.getMovie(title);
    this.search.setValue('');
    this.showMovie = true;
    this.result?.subscribe((movie) =>
      movie?.Country.split(', ').forEach((country: string) =>
        this.appApiService.getCountry(country)
      )
    );
  }
}

// [
//   {
//     name: {
//       common: 'United States',
//       official: 'United States of America',
//       nativeName: {
//         eng: { official: 'United States of America', common: 'United States' },
//       },
//     },
//     tld: ['.us'],
//     cca2: 'US',
//     ccn3: '840',
//     cca3: 'USA',
//     cioc: 'USA',
//     independent: true,
//     status: 'officially-assigned',
//     unMember: true,
//     currencies: { USD: { name: 'United States dollar', symbol: '$' } },
//     idd: {
//       root: '+1',
//       suffixes: ['989'],
//     },
//     capital: ['Washington, D.C.'],
//     altSpellings: ['US', 'USA', 'United States of America'],
//     region: 'Americas',
//     subregion: 'North America',
//     languages: { eng: 'English' },
//     translations: {
//       ara: {
//         official: 'الولايات المتحدة الامريكية',
//         common: 'الولايات المتحدة',
//       },
//       bre: { official: 'Stadoù-Unanet Amerika', common: 'Stadoù-Unanet' },
//       ces: { official: 'Spojené státy americké', common: 'Spojené státy' },
//       cym: { official: 'United States of America', common: 'United States' },
//       deu: {
//         official: 'Vereinigte Staaten von Amerika',
//         common: 'Vereinigte Staaten',
//       },
//       est: { official: 'Ameerika Ühendriigid', common: 'Ameerika Ühendriigid' },
//       fin: { official: 'Amerikan yhdysvallat', common: 'Yhdysvallat' },
//       fra: { official: "Les états-unis d'Amérique", common: 'États-Unis' },
//       hrv: {
//         official: 'Sjedinjene Države Amerike',
//         common: 'Sjedinjene Američke Države',
//       },
//       hun: {
//         official: 'Amerikai Egyesült Államok',
//         common: 'Amerikai Egyesült Államok',
//       },
//       ita: {
//         official: "Stati Uniti d'America",
//         common: "Stati Uniti d'America",
//       },
//       jpn: { official: 'アメリカ合衆国', common: 'アメリカ合衆国' },
//       kor: { official: '아메리카 합중국', common: '미국' },
//       nld: {
//         official: 'Verenigde Staten van Amerika',
//         common: 'Verenigde Staten',
//       },
//       per: { official: 'ایالات متحده آمریکا', common: 'ایالات متحده آمریکا' },
//       pol: {
//         official: 'Stany Zjednoczone Ameryki',
//         common: 'Stany Zjednoczone',
//       },
//       por: { official: 'Estados Unidos da América', common: 'Estados Unidos' },
//       rus: {
//         official: 'Соединенные Штаты Америки',
//         common: 'Соединённые Штаты Америки',
//       },
//       slk: {
//         official: 'Spojené štáty Americké',
//         common: 'Spojené štáty americké',
//       },
//       spa: { official: 'Estados Unidos de América', common: 'Estados Unidos' },
//       srp: {
//         official: 'Сједињене Америчке Државе',
//         common: 'Сједињене Америчке Државе',
//       },
//       swe: { official: 'Amerikas förenta stater', common: 'USA' },
//       tur: {
//         official: 'Amerika Birleşik Devletleri',
//         common: 'Amerika Birleşik Devletleri',
//       },
//       urd: { official: 'ریاستہائے متحدہ امریکا', common: 'ریاستہائے متحدہ' },
//       zho: { official: '美利坚合众国', common: '美国' },
//     },
//     latlng: [38.0, -97.0],
//     landlocked: false,
//     borders: ['CAN', 'MEX'],
//     area: 9372610.0,
//     demonyms: {
//       eng: { f: 'American', m: 'American' },
//       fra: { f: 'Américaine', m: 'Américain' },
//     },
//     flag: '\uD83C\uDDFA\uD83C\uDDF8',
//     maps: {
//       googleMaps: 'https://goo.gl/maps/e8M246zY4BSjkjAv6',
//       openStreetMaps:
//         'https://www.openstreetmap.org/relation/148838#map=2/20.6/-85.8',
//     },
//     population: 329484123,
//     gini: { '2018': 41.4 },
//     fifa: 'USA',
//     car: { signs: ['USA'], side: 'right' },
//     timezones: [
//       'UTC-12:00',
//       'UTC-11:00',
//       'UTC-10:00',
//       'UTC-09:00',
//       'UTC-08:00',
//       'UTC-07:00',
//       'UTC-06:00',
//       'UTC-05:00',
//       'UTC-04:00',
//       'UTC+10:00',
//       'UTC+12:00',
//     ],
//     continents: ['North America'],
//     flags: {
//       png: 'https://flagcdn.com/w320/us.png',
//       svg: 'https://flagcdn.com/us.svg',
//       alt: 'The flag of the United States of America is composed of thirteen equal horizontal bands of red alternating with white. A blue rectangle, bearing fifty small five-pointed white stars arranged in nine rows where rows of six stars alternate with rows of five stars, is superimposed in the canton.',
//     },
//     coatOfArms: {
//       png: 'https://mainfacts.com/media/images/coats_of_arms/us.png',
//       svg: 'https://mainfacts.com/media/images/coats_of_arms/us.svg',
//     },
//     startOfWeek: 'sunday',
//     capitalInfo: { latlng: [38.89, -77.05] },
//     postalCode: { format: '#####-####', regex: '^\\d{5}(-\\d{4})?$' },
//   },
// ];
