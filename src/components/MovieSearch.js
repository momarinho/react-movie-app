import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import MovieList from './MovieList';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const pageSize = 5;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=420907a8&s=${searchTerm}&page=${
          page + 1
        }`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setFilteredMovies(data.Search);
        setPage(0);
      } else {
        setFilteredMovies([]);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  useEffect(() => {
    const totalPages = Math.ceil(filteredMovies.length / pageSize);
    setPage((prevPage) => Math.min(prevPage, totalPages));
  }, [filteredMovies, pageSize]);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const displayedMovies = () => {
    const start = page * pageSize;
    const end = start + pageSize;

    const sortedMovies = [...filteredMovies].sort((a, b) =>
      sortOrder === 'asc'
        ? a.Title.localeCompare(b.Title)
        : b.Title.localeCompare(a.Title)
    );

    return sortedMovies.slice(start, end);
  };

  const totalPages = () => {
    return Math.ceil(filteredMovies.length / pageSize);
  };

  const handleNextPage = () => {
    if (page < totalPages() - 1) setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <div>
      <SearchForm
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSubmit={handleSubmit}
      />

      <MovieList
        movies={displayedMovies()}
        onSort={handleSort}
        onMovieSelect={handleMovieSelect}
        onPrevClick={handlePrevPage}
        onNextClick={handleNextPage}
        currentPage={page}
      />

      <p>
        {page + 1} of {totalPages()}
      </p>
    </div>
  );
};

export default MovieSearch;
