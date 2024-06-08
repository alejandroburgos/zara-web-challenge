import React, { useState, useEffect } from "react";
import searchIcon from "../assets/icons/search-icon.svg";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    onSearch(query);
  }, [query, onSearch]);

  return (
    <div>
      <div className="search-bar">
        <img src={searchIcon} alt="Search Icon" className="search-bar__icon" />
        <input
          type="text"
          placeholder="Search a character..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar__input"
        />
      </div>
    </div>
  );
};

export default SearchBar;
