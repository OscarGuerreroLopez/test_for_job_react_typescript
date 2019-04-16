import React from "react";

import { IMovieTableProps } from "../model";

import { ConvertDate } from "../functions/convert_date";

export const MovieTable = (props: IMovieTableProps) => {
  const { films } = props;

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
          {films &&
            films.map(film => {
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
    </div>
  );
};

// <span key={film.title} className="name">
// {film.title}
// </span>
