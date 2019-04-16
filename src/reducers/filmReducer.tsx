import { Reducer } from "redux";
import { AllActions } from "../model";
import { initialFilmState, IFilmState, FilmActionTypes } from "../model";

export const filmReducer: Reducer<IFilmState, AllActions> = (
  state = initialFilmState,
  action
) => {
  switch (action.type) {
    case FilmActionTypes.GET_ALL: {
      return {
        ...state,
        films: action.films
      };
    }

    case FilmActionTypes.GET_FILMS_PENDING: {
      return {
        ...state,
        loading: action.loading
      };
    }

    case FilmActionTypes.GET_FILMS_ERROR: {
      return {
        ...state,
        error: action.error
      };
    }

    default:
      return state;
  }
};
