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
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 16 16"
        class="bi bi-heart-fill"
        fill="red"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
        />
      </svg>
      <h2 className="movie-detail-title">{movie.Title}</h2>
      <p>Year: {movie.Year}</p>
      <p>Type: {type}</p>
      <p>Plot: {plot}</p>
      <img src={movie.Poster} alt={movie.Title} />
      
    </div>
  );
};

export default MovieDetail;
