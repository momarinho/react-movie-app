import React, { useState, useEffect } from 'react';

const MovieDetail = ({
  movie,
  handleAddFavorites,
  handleRemoveFavorites,
  isFavorite,
}) => {
  const [plot, setPlot] = useState('');
  const [type, setType] = useState('');

  const apiKey = '420907a8';

  useEffect(() => {
    async function fetchPlot() {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&t=${movie.Title}&plot=short&type=${movie.Type}`
      );
      const data = await response.json();
      setPlot(data.Plot);
      setType(data.Type);
    }
    fetchPlot();
  }, [movie.Title, movie.Type]);

  return (
    <div className="movie-detail">
      <div>
        {isFavorite(movie) ? (
          <div
            className="rfav-btn"
            onClick={() => handleRemoveFavorites(movie)}
          >
            <div>
              <h2 className="movie-detail-title">{movie.Title}</h2>
            </div>
            <p>Remove favorite</p>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              title="Remove favorite"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </div>
        ) : (
          <div className="fav-btn" onClick={() => handleAddFavorites(movie)}>
            <div>
              <h2 className="movie-detail-title">{movie.Title}</h2>
            </div>
            <p>Add favorites</p>
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
              title="Add favorites"
            >
              <path
                fill-rule="evenodd"
                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
              />
            </svg>
          </div>
        )}
      </div>
      <div>
        <p>Year: {movie.Year}</p>
        <p>Type: {type}</p>
        <hr/>
        <p>Plot: {plot}</p>
        <img src={movie.Poster} alt={movie.Title} />
      </div>
    </div>
  );
};

export default MovieDetail;
