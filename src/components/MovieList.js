import React, { useEffect, useState } from 'react';
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

  const handleAddFavorites = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);

    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const handleRemoveFavorites = (movie) => {
    const newFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites'));
    if (storedFavorites) {
      setFavorites(storedFavorites);
    }
  }, []);

  const isFavorite = (movie) => {
    return favorites.some((fav) => fav.imdbID === movie.imdbID);
  };

  const handleFavoritesModalClick = () => {
    setShowFavoritesModal(true);
  };

  const handleCloseFavoritesModal = () => {
    setShowFavoritesModal(false);
  };

  return (
    <div className="list-container">
      <div>
        <button onClick={handleFavoritesModalClick}>View Favorites</button>
      </div>
      <button onClick={() => onSort('asc')}>Sort by Title (A-Z)</button>
      <button onClick={() => onSort('desc')}>Sort by Title (Z-A)</button>
      <div className="movie-list">
        <div className="movies">
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
              handleAddFavorites={handleAddFavorites}
              handleRemoveFavorites={handleRemoveFavorites}
              isFavorite={isFavorite}
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
      <div className="pagination">
        <button disabled={page === 1} onClick={onPrevClick}>
          Previous
        </button>
        <button onClick={onNextClick}>Next</button>
      </div>
    </div>
  );
};

export default MovieList;
