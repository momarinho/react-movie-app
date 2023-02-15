import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import MovieList from './MovieList';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const pageSize = 5;
  const apiKey = '420907a8';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}&type=movie&y=${releaseDate}&r=${rating}&g=${genre}`
      );
      const data = await response.json();

      if (data.Response === 'True') {
        setFilteredMovies(data.Search);
        setPage(0);
      } else {
        setFilteredMovies([]);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert('An error occurred');
      setLoading(false);
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

  // const clear = () => {
  //   localStorage.clear();
  // };

  return (
    <div>
      {loading && <div>Loading...</div>}

      {filteredMovies.length > 0 ? (
        <div>
          <>
            <SearchForm
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              genre={genre}
              setGenre={setGenre}
              rating={rating}
              setRating={setRating}
              releaseDate={releaseDate}
              setReleaseDate={setReleaseDate}
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
            {/* <button onClick={clear}>ClearLocalStorage</button> */}
          </>
        </div>
      ) : (
        <>
          <h1>Movies and Series Search App</h1>
          <SearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            genre={genre}
            setGenre={setGenre}
            rating={rating}
            setRating={setRating}
            releaseDate={releaseDate}
            setReleaseDate={setReleaseDate}
            handleSubmit={handleSubmit}
          />
        </>
      )}
    </div>
  );
};

export default MovieSearch;
