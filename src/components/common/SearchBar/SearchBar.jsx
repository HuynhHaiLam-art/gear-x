import React, { useState, useEffect } from 'react';
import { FiSearch } from "react-icons/fi";
import './SearchBar.css';

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  return (
    <div className="search-container">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        value={searchValue}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;