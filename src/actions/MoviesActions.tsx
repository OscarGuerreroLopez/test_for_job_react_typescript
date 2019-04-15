import { ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axios from "axios";

import { IFilmState, FilmActionTypes, IFilmGetAllAction } from "../model";

export const getAllFilms: ActionCreator<
  ThunkAction<Promise<any>, IFilmState, null, IFilmGetAllAction>
> = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get("https://swapi.co/api/films/");
      dispatch({
        films: response.data.results,
        type: FilmActionTypes.GET_ALL
      });
    } catch (err) {
      console.error(err);
    }
  };
};
