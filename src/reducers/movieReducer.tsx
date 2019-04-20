import { Reducer } from "redux";
import {
  MovieActions,
  initialMovieState,
  MovieActionTypes,
  IMovieState
} from "../model";

export const movieReducer: Reducer<IMovieState, MovieActions> = (
  state = initialMovieState,
  action
) => {
  switch (action.type) {
    case MovieActionTypes.GET_MOVIE: {
      return {
        ...state,
        movie: action.movie
      };
    }

    case MovieActionTypes.GET_MOVIE_PENDING: {
      return {
        ...state,
        loading: action.loading
      };
    }

    case MovieActionTypes.GET_MOVIE_ERROR: {
      return {
        ...state,
        error: action.error
      };
    }

    default:
      return state;
  }
};
