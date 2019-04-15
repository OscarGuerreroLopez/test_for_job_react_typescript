import React, { Component } from "react";
import { connect } from "react-redux";

import { IAppState } from "../model";
import { IFilm } from "../model";

interface IProps {
  films: IFilm[];
}

class Start extends Component<IProps> {
  render() {
    const { films } = this.props;
    return (
      <>
        <div className="jumbotron text-center">
          <h1>Star Wars Movies</h1>
        </div>
        <div className="name-container">
          {films &&
            films.map(film => {
              return (
                <span key={film.title} className="name">
                  {film.title}
                </span>
              );
            })}
        </div>
      </>
    );
  }
}

const mapStateToProps = (store: IAppState) => {
  return {
    films: store.filmState.films
  };
};

export default connect(mapStateToProps)(Start);
