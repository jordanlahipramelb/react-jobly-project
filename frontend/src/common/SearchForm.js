import React, { useState } from "react";

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Search term passed down from parent
  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchFor(searchTerm.trim());
    setSearchTerm(searchTerm.trim());
  };

  // Updates form field when typing
  const handleChange = (evt) => {
    const { value } = evt.target;
    setSearchTerm(value);
  };

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchTerm"
          placeholder="Enter search term"
          value={searchTerm}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchForm;
