import React from "react";
import { Router } from "@reach/router";

import { Home } from "../containers/home";
import Start from "../containers/start";

const RouterMain = () => {
  return (
    <Router>
      <Home path="/" />
      <Home path="home" />
      <Start path="start" />
    </Router>
  );
};

export default RouterMain;
