import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

import { IFilmState, FilmActionTypes, AllActions } from "../model";

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
