import React, { Component } from "react";
import { connect } from "react-redux";
import { IAppState, IMovieProps } from "../model";

import { Loading } from "../components/loading";

import { ErrorPage } from "../components/error";

import { Left } from "../components/left";
import { Right } from "../components/right";

class Movie extends Component<IMovieProps, {}> {
  render() {
    console.log(this.props);

    const { movie, loading, error } = this.props;

    return (
      <div className="container-fluid text-center">
        {loading ? (
          error ? (
            <ErrorPage />
          ) : (
            <Loading />
          )
        ) : (
          <div className="container text-center">
            <h2>{movie.title} details</h2>
            <div className="container">
              <div className="row">
                <div className="col-sm">
                  <Left
                    info={{
                      director: movie.director,
                      producer: movie.producer,
                      opening: movie.opening_crawl,
                      date: movie.release_date
                    }}
                  />
                </div>

                <div className="col-sm">
                  <Right characters={movie.characters} />
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
