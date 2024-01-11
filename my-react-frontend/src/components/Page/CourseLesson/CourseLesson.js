// CourseLessons.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import "./CourseLesson.css";

const CourseLesson = () => {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/courses/${id}/lessons`
        );
        setLessons(response.data);
        const lessonsLength = response.data.length;
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bài học từ API:", error);
      }
    };

    fetchLessons();
  }, [id]);

  if (lessons.length === 0) {
    return <p>Hiện khoá học này chưa có bài học</p>;
  }

  console.log(lessons);
  return (
    <div className="course-lesson">
      <Header />
      <div className="course-lesson-container">
        <h2>Danh sách bài học</h2>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <Link to={`/course/${id}/learn/${lesson.id}`}>
                {lesson.title}
              </Link>
            </li>
          ))}
          <li>
            <Link to={`/course/${id}/learn/question`}>Bài kiểm tra</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CourseLesson;
