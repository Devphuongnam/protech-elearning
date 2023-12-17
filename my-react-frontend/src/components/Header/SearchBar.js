import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigate(`/search?key=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Tìm kiếm khóa học..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        style={{ borderRadius: "10px", backgroundColor: "white" }}
        onClick={handleSearch}
      >
        Tìm kiếm
      </button>
    </div>
  );
};

export default SearchBar;
