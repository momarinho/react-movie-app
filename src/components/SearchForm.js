import React from 'react';

const SearchForm = ({ searchTerm, setSearchTerm, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      placeholder="Type to search..."
    />
    <button type="submit">Search</button>
  </form>
);

export default SearchForm;
