export interface SearchMovie {
  Title: string;
  Year: string;
  Poster: string;
}

export interface Movie extends SearchMovie {
  Runtime: string;
  Actors: string;
  Country: string;
}

export interface Search {
  Search: Array<SearchMovie>;
}
