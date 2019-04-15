import { applyMiddleware, combineReducers, createStore, Store } from "redux";
/*  Thunk
Redux Thunk middleware allows you to write action creators that return a function instead of an action. The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met. The inner function receives the store methods dispatch and getState as parameters.
*/
import thunk from "redux-thunk";
// Import reducers and state type
import { filmReducer } from "../reducers/filmReducer";
import { IAppState } from "../model";

import { createLogger } from "redux-logger";

// Create an interface for the application state
// export interface IAppState {
//   filmState: IFilmState;
// }

// Create the root reducer
const rootReducer = combineReducers<IAppState>({
  filmState: filmReducer
});

const logger = createLogger({
  collapsed: true
});

// Create a configure store function of type `IAppState`
export default function configureStore(): Store<IAppState, any> {
  const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(thunk, logger)
  );
  return store;
}
