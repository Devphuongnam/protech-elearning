import React, { useEffect, useState } from "react";
import Course from "../course/course";
import { useLocation } from "react-router-dom";
import courses from "../course/data";

const SearchPage = () => {
  const location = useLocation();
  const searchKey = new URLSearchParams(location.search).get("key");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const searchRequest = new Promise((resolve) => {
      setTimeout(() => {
        const results = courses.filter((course) =>
          course.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        resolve(results);
      }, 1000);
    });
    searchRequest.then((results) => setSearchResults(results));
  }, [searchKey]);

  return (
    <div>
      <h2>Kết Quả Tìm Kiếm cho: {searchKey}</h2>
      {searchResults.length === 0 ? (
        <p>Không có kết quả phù hợp.</p>
      ) : (
        <div>
          <h3>Danh Sách Khoá Học</h3>
          <ul>
            {searchResults.map((result) => (
              <Course key={result.id} course={result} />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
