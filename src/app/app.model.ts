export interface SearchMovie {
  Title: string;
  Year: string;
  Poster: string;
}

export interface Movie extends SearchMovie {
  Runtime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Country: string;
  Plot: string;
}

export interface Search {
  Search: SearchMovie[];
}

export interface Country {
  name: CountryName;
  cca2: string;
  currencies: any;
  population: number;
}

export interface CountryName {
  common: string;
}
