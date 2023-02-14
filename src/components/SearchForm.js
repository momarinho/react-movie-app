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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for a movie"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="">Select genre</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="horror">Horror</option>
        <option value="romance">Romance</option>
        <option value="thriller">Thriller</option>
      </select>
      <select value={rating} onChange={(e) => setRating(e.target.value)}>
        <option value="">Select rating</option>
        <option value="8">8+</option>
        <option value="7">7+</option>
        <option value="6">6+</option>
        <option value="5">5+</option>
      </select>
      <input
        type="text"
        placeholder="Release year"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
