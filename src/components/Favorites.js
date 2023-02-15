import React from 'react';

const FavoritesList = ({ favorites, handleOpenDetailsModal }) => {
  return (
    <div className="favorites-container">
      {favorites.length === 0 ? (
        <p>You have no favorites to show</p>
      ) : (
        <div className="favorites-content">
          {favorites.map((movie) => (
            <div key={movie.imdbID}>
              <img
                src={movie.Poster}
                alt={movie.imdbID}
                key={movie.imdbID}
                onClick={() => handleOpenDetailsModal(movie)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
