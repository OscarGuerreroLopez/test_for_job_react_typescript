import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppState, IMovieProps } from "../model";

import { Loading } from "../components/loading";

import { ErrorPage } from "../components/error";

import { Left } from "../components/left";
import { Right } from "../components/right";

class Movie extends Component<IMovieProps, {}> {
  render() {
    const { movie, loading, error } = this.props;
    console.log(movie);
    console.log(loading);
    console.log(error);

    return (
      <div className="container-fluid text-center">
        <h2>Movie details</h2>
        {loading ? (
          error ? (
            <ErrorPage />
          ) : (
            <Loading />
          )
        ) : (
          <div className="container text-center">
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <Left />
                </div>
                <div className="col-sm">
                  <Right />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    movie: store.movieState.movie,
    loading: store.movieState.loading,
    error: store.movieState.error
  };
};

export default connect(mapStateToProps)(Movie);
