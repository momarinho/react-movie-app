import React, { useEffect, useState } from 'react';
import SearchForm from './SearchForm';
import MovieList from './MovieList';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [error, setError] = useState(null);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const pageSize = 6;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=420907a8&s=${searchTerm}&page=${
          page + 1
        }`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setMovies(data.Search);
        setFilteredMovies(data.Search);
        setPage(0);
      } else {
        setMovies([]);
        setFilteredMovies([]);
      }
    } catch (error) {
      setError('An error ocurred');
      setMovies([]);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [searchTerm]);

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const fuzzySearch = (searchTerm) => {
    return movies.filter((movie) => {
      const title = movie.Title.toLowerCase();
      const search = searchTerm.toLowerCase();
      let distance = 0;

      for (let i = 0; i < search.length; i++) {
        if (!title.includes(search[i])) {
          distance++;
        }
      }

      return distance <= 2;
    });
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const displayedMovies = () => {
    const start = page * pageSize;
    const end = start + pageSize;

    const sortedMovies = [
      ...(filteredMovies.length > 0 ? filteredMovies : movies),
    ].sort((a, b) =>
      sortOrder === 'asc'
        ? a.Title.localeCompare(b.Title)
        : b.Title.localeCompare(a.Title)
    );

    return sortedMovies.slice(start, end);
  };

  const totalPages = () => {
    return Math.ceil(movies.length / pageSize);
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
