import React, { useState } from 'react';
import SearchForm from './SearchForm';
import MovieList from './MovieList';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('asc');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `http://www.omdbapi.com/?apikey=420907a8&s=${searchTerm}&page=${page}&sort=${sort}&type=${selectedMovie}`
    );
    const data = await response.json();

    if (data.Response === 'True') {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  const handleSort = (order) => {
    setSort(order);
    setMovies(
      [...movies].sort((a, b) =>
        order === 'asc'
          ? a.Title.localeCompare(b.Title)
          : b.Title.localeCompare(a.Title)
      )
    );
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleNextClick = () => {
    setPage(page + 1);
    handleSubmit({ preventDefault: () => {}, searchTerm });
  };

  const handlePrevClick = () => {
    setPage(page - 1);
    handleSubmit({ preventDefault: () => {}, searchTerm });
  };

  return (
    <div className="App">
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
      />

      <MovieList
        movies={movies}
        onSort={handleSort}
        onMovieSelect={handleMovieSelect}
        onPrevClick={handlePrevClick}
        onNextClick={handleNextClick}
        currentPage={page}
      />
    </div>
  );
};

export default MovieSearch;
