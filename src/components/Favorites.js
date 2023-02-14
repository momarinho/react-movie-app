import React from 'react';

const FavoritesList = ({ favorites, handleRemoveFavorites }) => {
  return (
    <div className="favorites-content">
      {favorites.map((movie) => (
        <div>
          <img src={movie.Poster} alt={movie.imdbID} key={movie.imdbID} />
          <svg
            onClick={() => handleRemoveFavorites(movie)}
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
            title="Remove from favorites"
          >
            <path
              fill-rule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
