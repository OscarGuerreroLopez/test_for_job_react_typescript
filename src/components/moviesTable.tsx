import React, { Component } from "react";

import { IMovieTableProps, IFilm } from "../model";

import { ConvertDate } from "../functions/convert_date";

interface State {
  movieTable: IFilm[];
  pageNumbers: number[];
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
        .map((x, i) => i + 1)
    };
  }

  // ************************************************************************************
  // ***************************When user clicks on the page number**********************

  changePage = (newPage: number) => {
    this.pageIndex = (newPage - 1) * this.moviesPerPage;
    console.log(this.movieTableSearch.length);

    // if nothing has been entered in th search box make sure you load original movies
    // else load the search table
    if (this.movieTableSearch.length === 0) {
      this.setState({
        ...this.state,
        movieTable: this.giveMeMovies(this.films)
      });
    } else {
      this.setState({
        ...this.state,
        movieTable: this.giveMeMovies(this.movieTableSearch)
      });
    }
  };

  // ************************************************************************************

  giveMeMovies = (films: IFilm[]) => {
    return films.slice(this.pageIndex, this.pageIndex + this.moviesPerPage);
  };

  // ************************************************************************************

  onNameChange = (evt: any) => {
    let count = evt.target.value.length;

    this.movieTableSearch = [];

    this.films.map(movie => {
      if (
        movie.title.substring(0, count).toLocaleLowerCase() ===
        evt.target.value.toLocaleLowerCase()
      ) {
        this.movieTableSearch.push(movie); // maybe better to use spread operator
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

  render() {
    return (
      <div className="container-fluid">
        {/* ******************************************************* */}
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
        <br />
        {/* ******************************************************* */}

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
                  <tr key={film.title}>
                    <th scope="row">{film.title}</th>
                    <td>{film.director}</td>
                    <td>{ConvertDate(film.release_date)}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
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

export default MovieTable;
