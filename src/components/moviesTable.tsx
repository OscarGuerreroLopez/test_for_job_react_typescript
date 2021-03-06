import React, { Component } from "react";
import { Link } from "@reach/router";

import { IMovieTableProps, IFilm } from "../model";

import { ConvertDate } from "../functions/convert_date";

import { getMovie as getMovieAction } from "../actions/MoviesActions";

import { ThunkDispatch } from "redux-thunk";

import { connect } from "react-redux";

interface State {
  movieTable: IFilm[];
  pageNumbers: number[];
  pageSelected: number;
}

class MovieTable extends Component<IMovieTableProps, State> {
  films = this.props.films;
  moviesPerPage = 5;
  pageSelected = 1;
  pageIndex = (this.pageSelected - 1) * this.moviesPerPage;
  movieTableSearch: IFilm[] = [];

  // ************************************************************************************
  // *************************************Constructor************************************

  constructor(props: IMovieTableProps) {
    super(props);

    this.state = {
      movieTable: this.giveMeMovies(this.films),
      pageNumbers: Array(Math.ceil(this.films.length / this.moviesPerPage))
        .fill(0)
        .map((x, i) => i + 1),
      pageSelected: 1
    };
  }

  // ************************************************************************************
  // ***************************When user clicks on the page number**********************

  changePage = (newPage: number) => {
    this.pageIndex = (newPage - 1) * this.moviesPerPage;

    // if nothing has been entered in th search box make sure you load original movies
    // else load the search table
    if (this.movieTableSearch.length === 0) {
      this.setState({
        ...this.state,
        movieTable: this.giveMeMovies(this.films),
        pageSelected: newPage
      });
    } else {
      this.setState({
        ...this.state,
        movieTable: this.giveMeMovies(this.movieTableSearch),
        pageSelected: newPage
      });
    }
  };

  // ************************************************************************************

  giveMeMovies = (films: IFilm[]) => {
    return films.slice(this.pageIndex, this.pageIndex + this.moviesPerPage);
  };

  // ************************************************************************************
  // ****************************When User types on search box***************************

  onNameChange = (evt: any) => {
    let count = evt.target.value.length;

    this.movieTableSearch = [];

    this.films.map(movie => {
      if (
        movie.title.substring(0, count).toLocaleLowerCase() ===
        evt.target.value.toLocaleLowerCase()
      ) {
        this.movieTableSearch = [...this.movieTableSearch, movie];
        this.setState({
          ...this.state,
          movieTable: this.giveMeMovies(this.movieTableSearch),
          pageNumbers: Array(
            Math.ceil(this.movieTableSearch.length / this.moviesPerPage)
          )
            .fill(0)
            .map((x, i) => i + 1)
        });
      }
    });
  };

  // ************************************************************************************
  // ******************************Movie selected:***************************************
  selectedMovie(movie: IFilm) {
    this.props.getMovie(movie);
  }
  // ************************************************************************************

  render() {
    return (
      <div className="container-fluid">
        {/* *********************Search box*************************** */}
        {this.state.pageSelected === 1 ? (
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-lg">
                Movie search, start typing:
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              aria-label="Large"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="Movie Name"
              ref="name"
              onChange={this.onNameChange}
            />
          </div>
        ) : (
          <div />
        )}

        <br />
        {/* *******************Table******************************** */}
        <div className="container text-center">
          <h4>Click on a movie to see the details:</h4>
        </div>
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Director</th>
              <th scope="col">Release date:</th>
            </tr>
          </thead>
          <tbody>
            {this.state.movieTable &&
              this.state.movieTable.map(film => {
                return (
                  <tr key={film.title} onClick={() => this.selectedMovie(film)}>
                    <th scope="row">
                      <Link to="/movie">{film.title}</Link>
                    </th>

                    <td>{film.director}</td>
                    <td>{ConvertDate(film.release_date)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        {/* ****************Page Numbers******************************* */}

        <div className="btn-group float-right">
          {this.state.pageNumbers.map((page, index) => {
            return (
              <button
                className="btn btn-outline-primary"
                key={index}
                onClick={() => this.changePage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => {
  return {
    getMovie: (movie: IFilm) => {
      return dispatch(getMovieAction(movie));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(MovieTable);
