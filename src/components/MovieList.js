import React, { useState } from 'react';
import FavoritesList from './Favorites';
import MovieDetail from './MovieDetail';

const MovieList = ({ movies, onSort, onNextClick, onPrevClick, page }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseClick = () => {
    setSelectedMovie(null);
  };

  const handleFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };

  const handleFavoritesModalClick = () => {
    setShowFavoritesModal(true);
  };

  const handleCloseFavoritesModal = () => {
    setShowFavoritesModal(false);
  };

  return (
    <div className="list-container">
      <h2>Movies</h2>
      <button onClick={() => onSort('asc')}>Sort by Title (A-Z)</button>
      <button onClick={() => onSort('desc')}>Sort by Title (Z-A)</button>
      <div>
        <button onClick={handleFavoritesModalClick}>View Favorites</button>
      </div>
      <div className="movie-list">
        <div>
          {movies.map((movie) => (
            <div key={movie.imdbID}>
              <img
                src={movie.Poster}
                alt={movie.Title}
                onClick={() => handleMovieClick(movie)}
              />
            </div>
          ))}
        </div>
      </div>
      {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseClick}>Close</button>
            <MovieDetail
              movie={selectedMovie}
              handleFavorites={handleFavorites}
            />
          </div>
        </div>
      )}
      {showFavoritesModal && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={handleCloseFavoritesModal}>Close</button>
            <FavoritesList favorites={favorites} />
          </div>
        </div>
      )}
      <div>
        <button disabled={page === 1} onClick={onPrevClick}>
          Previous
        </button>
        <button onClick={onNextClick}>Next</button>
      </div>
    </div>
  );
};

export default MovieList;
