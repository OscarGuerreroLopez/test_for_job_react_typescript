import { ActionCreator, Dispatch, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
// import { Observable } from "rxjs";
import axios from "axios";
import { loadPeople } from "../functions/movieInfo";

import {
  IFilmState,
  FilmActionTypes,
  AllActions,
  MovieActionTypes,
  IFilm
} from "../model";

import { compare } from "../functions/compare";

export const getAllFilms: ActionCreator<
  ThunkAction<Promise<any>, IFilmState, null, AllActions>
> = () => {
  return async (dispatch: Dispatch) => {
    dispatch({
      type: FilmActionTypes.GET_FILMS_PENDING,
      loading: true
    });

    axios
      .get("https://swapi.co/api/films/")
      .then(response => {
        dispatch({
          films: response.data.results.sort(compare),
          type: FilmActionTypes.GET_ALL
        });
        dispatch({
          type: FilmActionTypes.GET_FILMS_ERROR,
          error: false
        });

        dispatch({
          type: FilmActionTypes.GET_FILMS_PENDING,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: FilmActionTypes.GET_FILMS_ERROR,
          error: true
        });
      });
  };
};

export const getMovie = (
  movie: IFilm
): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
    return new Promise<void>(resolve => {
      dispatch({
        type: MovieActionTypes.GET_MOVIE_PENDING,
        loading: true
      });

      loadPeople(movie.characters).subscribe(
        (data: string[]) => {
          dispatch({
            type: MovieActionTypes.GET_MOVIE,
            movie: {
              title: movie.title,
              opening_crawl: movie.opening_crawl,
              director: movie.director,
              producer: movie.producer,
              release_date: movie.release_date,
              characters: data
            }
          });

          dispatch({
            type: MovieActionTypes.GET_MOVIE_ERROR,
            error: false
          });

          dispatch({
            type: MovieActionTypes.GET_MOVIE_PENDING,
            loading: false
          });
        },
        (error: any) => {
          console.log(error);
          dispatch({
            type: MovieActionTypes.GET_MOVIE_ERROR,
            error: true
          });
        },
        () => {
          console.log("All Characters pulled");
        }
      );
    });
  };
};
