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
    default:
      return state;
  }
};
