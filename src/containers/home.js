import React from "react";

import { Link } from "@reach/router";

export const Home = () => {
  return (
    <div className="container text-center">
      <h1>Home</h1>
      <p>
        <b>
          The goal of this exercise is to code a simple react app based
          application to browse through StarWars movie titles.
        </b>
      </p>
      <p>
        I will use the Swapi.co (https://swapi.co) REST services to obtain the
        data.
      </p>
      <p>For this I will use React typescript, axios, rxjs and Redux</p>
      <br />
      <Link to="start">Start the app</Link>
    </div>
  );
};
