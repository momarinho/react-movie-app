import React, { useState, useEffect } from 'react';

const MovieDetail = ({ movie }) => {
  const [plot, setPlot] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    async function fetchPlot() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=420907a8&t=${movie.Title}&plot=short&type=${movie.Type}`
      );
      const data = await response.json();
      setPlot(data.Plot);
      setType(data.Type);
    }
    fetchPlot();
  }, [movie.Title, movie.Type]);

  return (
    <div className="movie-detail">
      <h2 className="movie-detail-title">{movie.Title}</h2>
      <p>Year: {movie.Year}</p>
      <p>Type: {type}</p>
      <p>Plot: {plot}</p>
      <img src={movie.Poster} alt={movie.Title} />
    </div>
  );
};

export default MovieDetail;
