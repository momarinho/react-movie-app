import React from 'react';

const FavoritesList = ({ favorites }) => {
  return (
    <div className="favorites-content">
      {favorites.map((movie) => (
        <img src={movie.Poster} alt={movie.imdbID} key={movie.imdbID} />
      ))}
    </div>
  );
};

export default FavoritesList;
