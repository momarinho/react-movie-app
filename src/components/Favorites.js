import React from 'react';

const FavoritesList = ({
  favorites,
  handleRemoveFavorites,
  handleOpenDetailsModal,
}) => {
  return (
    <div className="favorites-content">
      {favorites.map((movie) => (
        <div key={movie.imdbID} onClick={() => handleOpenDetailsModal(movie)}>
          <img src={movie.Poster} alt={movie.imdbID} key={movie.imdbID} />
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
