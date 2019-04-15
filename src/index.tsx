import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Store } from "redux";

import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";

import configureStore from "./store";
import { IAppState } from "./model";
import { getAllFilms } from "./actions/MoviesActions";

interface IProps {
  store: Store<IAppState>;
}

const Root: React.SFC<IProps> = props => {
  return (
    <Provider store={props.store}>
      <App />
    </Provider>
  );
};

// Generate the store
const store = configureStore();
store.dispatch(getAllFilms());

// Render the App
ReactDOM.render(<Root store={store} />, document.getElementById(
  "root"
) as HTMLElement);
