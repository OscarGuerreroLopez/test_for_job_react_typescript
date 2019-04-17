import React, { Component } from "react";

import { IMovieTableProps, IFilm } from "../model";

import { ConvertDate } from "../functions/convert_date";

interface State {
  movieTable: IFilm[];
}

class MovieTable extends Component<IMovieTableProps, State> {
  constructor(props: IMovieTableProps) {
    super(props);

    this.state = {
      movieTable: this.giveMeMovies(this.films)
    };
  }

  films = this.props.films;
  moviesPerPage = 5;
  pageSelected = 1;
  pageIndex = (this.pageSelected - 1) * this.moviesPerPage;

  pageNumbers = Array(Math.ceil(this.films.length / this.moviesPerPage))
    .fill(0)
    .map((x, i) => i + 1);

  changePage = (newPage: number) => {
    this.pageIndex = (newPage - 1) * this.moviesPerPage;
    this.setState({
      movieTable: this.giveMeMovies(this.films)
    });
  };

  giveMeMovies = (films: IFilm[]) => {
    return films.slice(this.pageIndex, this.pageIndex + this.moviesPerPage);
  };

  render() {
    return (
      <div className="container-fluid">
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
          {this.pageNumbers.map((page, index) => {
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
