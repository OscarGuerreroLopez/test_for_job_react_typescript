import React, { Component } from "react";

import { IMovieTableProps, IFilm } from "../model";

import { ConvertDate } from "../functions/convert_date";

interface State {
  movieTable: IFilm[];
  searchName: string;
  pageNumbers: number[];
}

class MovieTable extends Component<IMovieTableProps, State> {
  constructor(props: IMovieTableProps) {
    super(props);

    this.state = {
      movieTable: this.giveMeMovies(this.films),
      searchName: "",
      pageNumbers: Array(Math.ceil(this.films.length / this.moviesPerPage))
        .fill(0)
        .map((x, i) => i + 1)
    };
  }

  films = this.props.films;
  moviesPerPage = 5;
  pageSelected = 1;
  pageIndex = (this.pageSelected - 1) * this.moviesPerPage;

  changePage = (newPage: number) => {
    this.pageIndex = (newPage - 1) * this.moviesPerPage;
    this.setState({
      ...this.state,
      movieTable: this.giveMeMovies(this.films)
    });
  };

  giveMeMovies = (films: IFilm[]) => {
    return films.slice(this.pageIndex, this.pageIndex + this.moviesPerPage);
  };

  onNameChange = (evt: any) => {
    this.setState({
      ...this.state,
      searchName: evt.target.value
    });

    let count = evt.target.value.length;
    let movieTableSearch: IFilm[] = [];

    this.films.map(movie => {
      // console.log(evt.target.value.toLocaleLowerCase());
      // console.log(movie.title.substring(0, count).toLocaleLowerCase());

      if (
        movie.title.substring(0, count).toLocaleLowerCase() ===
        evt.target.value.toLocaleLowerCase()
      ) {
        movieTableSearch.push(movie); // maybe better to use spread operator
        this.setState({
          ...this.state,
          movieTable: this.giveMeMovies(movieTableSearch),
          pageNumbers: Array(
            Math.ceil(movieTableSearch.length / this.moviesPerPage)
          )
            .fill(0)
            .map((x, i) => i + 1)
        });
      }
    });
  };

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
