import React, { useState, useEffect } from 'react';
import { FiSearch } from "react-icons/fi";
import './SearchBar.css';

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value); // Gọi callback ngay khi người dùng nhập
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