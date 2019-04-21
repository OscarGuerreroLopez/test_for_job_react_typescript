import { applyMiddleware, combineReducers, createStore, Store } from "redux";

import thunk from "redux-thunk";

import { filmReducer } from "../reducers/filmReducer";
import { movieReducer } from "../reducers/movieReducer";
import { IAppState } from "../model";

import { createLogger } from "redux-logger";

const rootReducer = combineReducers<IAppState>({
  filmState: filmReducer,
  movieState: movieReducer
});

const logger = createLogger({
  collapsed: true
});

export default function configureStore(): Store<IAppState, any> {
  const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(thunk, logger)
  );
  return store;
}
