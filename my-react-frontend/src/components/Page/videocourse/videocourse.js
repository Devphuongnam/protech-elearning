import React from "react";
import { useParams } from "react-router-dom";
import courses from "../course/data";
import Header from "../../Header/Header";
import "./videocourse.css";

const VideoCourse = () => {
  const { courseId, lessonId } = useParams();
  const course = courses.find((c) => c.id === parseInt(courseId));

  if (!course) {
    return <div>Khoá học không tồn tại</div>;
  }

  const lesson = course.lessons.find((l) => l.id === parseInt(lessonId));
  if (!lesson) {
    return <div>Bài học không tồn tại</div>;
  }

  return (
    <div className="video-course">
      <Header />
      <div className="name-title-course">
        <h1>{course.name}</h1>
        <h2>{lesson.title}</h2>
        <iframe
          width="1000"
          height="500"
          src={`https://www.youtube.com/embed/${lesson.videoId}`}
          title={`${lesson.title} - Video`}
          frameborder="0"
          low="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; allowfullscreen"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
};

export default VideoCourse;
