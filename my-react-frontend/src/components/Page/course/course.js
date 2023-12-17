import React from "react";
import "./courselist.css";
import { useNavigate } from "react-router-dom";

const Course = ({ course }) => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate(`/course/${course.id}`);
  };

  return (
    <div className="course" onClick={handleCourseClick}>
      <img src={course.image} alt={course.name} className="course-image" />
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <p>Giá: ${course.price}</p>
    </div>
  );
};

export default Course;
