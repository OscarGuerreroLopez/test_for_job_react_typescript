import React, { Component } from "react";
import { connect } from "react-redux";

import { IAppState, IMoviesProps } from "../model";

import MovieTable from "../components/moviesTable";

import { Loading } from "../components/loading";

import { ErrorPage } from "../components/error";

class Start extends Component<IMoviesProps> {
  render() {
    const { films, loading, error } = this.props;

    return (
      <>
        <div className="jumbotron text-center">
          <h1>Star Wars Movies</h1>
        </div>
        <div className="name-container">
          {loading ? (
            error ? (
              <ErrorPage />
            ) : (
              <Loading />
            )
          ) : (
            <MovieTable films={films} />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    films: store.filmState.films,
    loading: store.filmState.loading,
    error: store.filmState.error
  };
};

export default connect(mapStateToProps)(Start);
