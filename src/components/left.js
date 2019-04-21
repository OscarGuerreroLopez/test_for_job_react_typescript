import React from "react";
import { ConvertDate } from "../functions/convert_date";

export const Left = props => {
  const { director, producer, opening, date } = props.info;

  return (
    <div className="container text-center">
      <h3>Director:</h3>
      <p>{director}</p>
      <h3>Producer:</h3>
      <p>{producer}</p>
      <h3>Release date:</h3>
      <p>{ConvertDate(date)}</p>
      <h3>Opening Crawl</h3>
      <p>{opening}</p>
    </div>
  );
};
