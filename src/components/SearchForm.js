import React from 'react';

const SearchForm = ({ searchTerm, setSearchTerm, handleSubmit }) => (
  <div className="input">
    <h2>MovieApp</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Type to search..."
      />
      <button type="submit">Search</button>
    </form>
  </div>
);

export default SearchForm;
