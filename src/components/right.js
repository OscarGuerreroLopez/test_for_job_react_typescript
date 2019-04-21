import React from "react";

export const Right = props => {
  const { characters } = props;

  return (
    <div className="container text-center">
      <h3>Characters:</h3>
      {characters.map(character => (
        <p key={character}>{character}</p>
      ))}
    </div>
  );
};
