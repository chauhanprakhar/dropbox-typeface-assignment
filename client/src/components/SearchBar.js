import React from 'react';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => (
  <div className="searchbar">
    <input
      className="searchbar-input"
      type="text"
      placeholder="Search"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default SearchBar; 