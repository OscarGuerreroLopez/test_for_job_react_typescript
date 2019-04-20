import React from "react";
import { Router } from "@reach/router";

import { Home } from "../containers/home";
import Start from "../containers/start";
import Movie from "../containers/movie";

const RouterMain = () => {
  return (
    <Router>
      <Home path="/" />
      <Home path="home" />
      <Start path="start" />
      <Movie path="movie" />
    </Router>
  );
};

export default RouterMain;
