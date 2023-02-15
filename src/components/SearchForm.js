import React from 'react';

const SearchForm = ({
  searchTerm,
  setSearchTerm,
  genre,
  setGenre,
  rating,
  setRating,
  releaseDate,
  setReleaseDate,
  handleSubmit,
}) => {
  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a movie"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <input
          type="text"
          placeholder="Release year"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchForm;
