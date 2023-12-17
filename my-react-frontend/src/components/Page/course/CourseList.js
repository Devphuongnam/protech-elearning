import React, { useState } from "react";
import Course from "./course";
import "./courselist.css";
import courses from "./data";
import Header from "../../Header/Header";

const CourseList = () => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const sortedCourses = [...courses].sort((a, b) => {
    const order = sortOrder === "asc" ? 1 : -1;
    return order * (a.price - b.price);
  });

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="course-list">
      <h1>Danh Sách Khoá Học</h1>
      <button onClick={toggleSortOrder}>
        Sắp xếp giá: {sortOrder === "asc" ? "Tăng Dần" : "Giảm Dần"}
      </button>
      <div className="courses-container">
        {sortedCourses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
export default CourseList;
