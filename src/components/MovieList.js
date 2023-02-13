import React, { useState } from 'react';
import MovieDetail from './MovieDetail';

const MovieList = ({ movies, onSort, onNextClick, onPrevClick, page }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div>
      <h2>Movies</h2>
      <button onClick={() => onSort('asc')}>Sort by Title (A-Z)</button>
      <button onClick={() => onSort('desc')}>Sort by Title (Z-A)</button>
      <div className="movie-list">
        <div>
          {movies.map((movie) => (
            <div key={movie.imdbID}>
              <hr />
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
            <MovieDetail movie={selectedMovie} />
          </div>
        </div>
      )}
      <div>
        <button disabled={page === 0} onClick={onPrevClick}>
          Previous
        </button>
        <button onClick={onNextClick}>Next</button>
      </div>
    </div>
  );
};

export default MovieList;
