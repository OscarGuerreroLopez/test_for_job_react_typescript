// Define the Film type
export interface IFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface IFilmState {
  readonly films: IFilm[];
  loading: boolean;
  error: boolean;
}

export const initialFilmState: IFilmState = {
  films: [],
  loading: false,
  error: false
};
export interface IAppState {
  filmState: IFilmState;
}

export enum FilmActionTypes {
  GET_FILMS_PENDING = "GET_FILMS_PENDING",
  GET_ALL = "GET_ALL",
  GET_FILMS_ERROR = "GET_FILMS_ERROR"
}

export interface IFilmGetAllAction {
  type: FilmActionTypes.GET_ALL;
  films: IFilm[];
}

export interface IFilmLoading {
  type: FilmActionTypes.GET_FILMS_PENDING;
  loading: boolean;
}

export interface IFilmError {
  type: FilmActionTypes.GET_FILMS_ERROR;
  error: boolean;
}

export interface IMoviesProps {
  films: IFilm[];
  loading: boolean;
  error: boolean;
}

export interface IMovieTableProps {
  films: IFilm[];
}

export type AllActions = IFilmGetAllAction | IFilmLoading | IFilmError;
