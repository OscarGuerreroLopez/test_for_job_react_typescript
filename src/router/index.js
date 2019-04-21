import React from "react";
import { createHistory, LocationProvider, Router } from "@reach/router";
import createHashSource from "hash-source";

import { Home } from "../containers/home";
import Start from "../containers/start";
import Movie from "../containers/movie";

const RouterMain = () => {
  let source = createHashSource();
  let history = createHistory(source);

  return (
    <LocationProvider history={history}>
      <Router>
        <Home path="/" />
        <Home path="home" />
        <Start path="start" />
        <Movie path="movie" />
      </Router>
    </LocationProvider>
  );
};

export default RouterMain;
