import React, { useState } from 'react';
import MovieDetail from './MovieDetail';

const MovieList = ({ movies, onSort, onNextClick, onPrevClick, page }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  return (
    <div>
      <h2>Movies</h2>
      <button onClick={() => onSort('asc')}>Sort by Title (A-Z)</button>
      <button onClick={() => onSort('desc')}>Sort by Title (Z-A)</button>
      <div className="movie-list">
        <div>
          {movies.map((movie) => (
            <p key={movie.imdbID}>
              <p>{movie.Title}</p>
              <p>{movie.Year}</p>
              <p>{movie.Type}</p>
              <img src={movie.Poster} alt={movie.Title} />;
              <p>
                <button onClick={() => setSelectedMovie(movie)}>More</button>
                {selectedMovie === movie && (
                  <button onClick={() => setSelectedMovie(null)}>Close</button>
                )}
              </p>
            </p>
          ))}
        </div>
      </div>
      {selectedMovie && (
        <div className="movie-detail">
          <MovieDetail movie={selectedMovie} />
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
