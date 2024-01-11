// LessonDetailPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../Header/Header";
import "./LessonDetail.css";

const LessonDetail = () => {
  const { id, lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalLessons, setTotalLessons] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLessonDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/courses/${id}/lessons/${lessonId}`
        );
        const selectedLesson = response.data.find(
          (item) => item.id === parseInt(lessonId, 10)
        );
        setLesson(selectedLesson);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chi tiết bài học từ API:", error);
      }
    };

    fetchLessonDetail();
  }, [id, lessonId, currentPage]);

  axios
    .get(`http://localhost:8081/api/courses/${id}/lessons`)
    .then((response) => {
      const totalLessons = response.data.length;
      setTotalLessons(totalLessons);
    })
    .catch((error) => {
      console.error(error);
    });

  const handleNextPage = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);

    // Update URL with the new lessonId
    navigate(`/course/${id}/learn/${nextPage}`);
  };

  const handlePreviousPage = () => {
    const previousPage = currentPage - 1;
    setCurrentPage(previousPage);

    // Update URL with the new lessonId
    navigate(`/course/${id}/learn/${previousPage}`);
  };

  const handleToDoTest = () => {
    // Add logic to handle checking and navigate to a new page
    // For example, you can redirect to a result page
    navigate(`/course/${id}/learn/question`);
  };

  const isLastLesson = currentPage === totalLessons;

  if (!lesson) {
    return <p>Hiện không có bài học nào mà bạn yêu cầu</p>;
  }

  return (
    <div className="lesson-detail">
      <Header />
      <h2>{lesson.title}</h2>
      <div className="play-video">
        <iframe
          allowfullscreen
          width="100%"
          height="600px"
          src={`https://www.youtube.com/embed/${lesson.videoId}`}
          title={`${lesson.title} - Video`}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
      <div className="button-container">
        {currentPage > 1 && (
          <button className="button" onClick={handlePreviousPage}>
            {"< "} Bài trước
          </button>
        )}
        {isLastLesson ? (
          <button className="button" onClick={handleToDoTest}>
            Làm Bài Kiểm Tra
          </button>
        ) : (
          <button className="button" onClick={handleNextPage}>
            Bài tiếp theo {" >"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonDetail;
