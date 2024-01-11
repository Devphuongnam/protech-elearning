import React from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <input
        placeholder="Tìm kiếm khoá học"
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
