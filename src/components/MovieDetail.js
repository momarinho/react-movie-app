import React from 'react';

const MovieDetail = ({ movie }) => {
  return (
    <div className="movie-detail">
      <h2 className="movie-detail-title">{movie.Title}</h2>
      <p>Year: {movie.Year}</p>
      <p>Director: {movie.Director}</p>
      <p>Actors: {movie.Actors}</p>
      <p>Plot: {movie.Plot}</p>
      <img src={movie.Poster} alt={movie.Title} />;
    </div>
  );
};

export default MovieDetail;
