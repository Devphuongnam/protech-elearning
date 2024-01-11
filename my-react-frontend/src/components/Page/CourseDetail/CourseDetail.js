import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CommentList from "../../Comment/CommentList";
import CommentForm from "../../Comment/CommentForm";
import Header from "../../Header/Header";
import Slidetop from "../../Slidetop/Slidetop";
import "./CourseDetail.css";

const CourseDetail = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [reloadComments, setReloadComments] = useState(false);

  const handleCommentSubmit = () => {
    // Cập nhật danh sách bình luận khi có bình luận mới
    setReloadComments((prev) => !prev);
  };

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/courses/${id}`
        );
        setCourse(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu chi tiết khoá học từ API:", error);
      }
    };

    fetchCourseDetail();
  }, [id]);
  // const fomattedDate = course.created_at.slice(0, 10);
  // console.log(fomattedDate);

  const handleStartLearning = () => {
    // Chuyển hướng sang trang mới (LessonsPage) với id của khoá học
    navigate(`/course/${id}/learn`);
  };

  if (!course) {
    return <p>Hiện không có khoá học mà bạn yêu cầu</p>;
  }

  const breadcrumb = pathname.split("/").filter((crumb) => crumb !== "");

  return (
    <div className="course-detail">
      <Header />
      <Slidetop />
      <div className="course-detail-container">
        <div className="breadcumb">
          <Link to="/">Trang Chủ</Link>
          {breadcrumb.map((crumb, index) => (
            <span key={index}>
              {" "}
              /{" "}
              {index === breadcrumb.length - 1 ? (
                <span>{course.title}</span>
              ) : (
                <Link to={`/${breadcrumb.slice(0, index + 1).join("/")}`}>
                  Danh Sách Khoá Học
                </Link>
              )}
            </span>
          ))}
        </div>
        <div className="course-interview">
          <div className="course-tittle">
            <i class="fa fa-graduation-cap" aria-hidden="true"></i>
            {course.title}
          </div>
          <div className="caption-news">
            <ul>
              <li>
                <i className="fa fa-user" aria-hidden="true">
                  Post By Admin
                </i>
              </li>
              <li>
                <i className="fa fa-calendar" aria-hidden="true">
                  {course.created_at.slice(0, 10)}
                </i>
              </li>
            </ul>
          </div>
          <div className="course-image">
            <img src={course.image_url} alt={course.title} />
          </div>
          <div className="course-description">{course.description}</div>
          <div className="course-price">Giá: {course.price}$</div>
          <div className="enter-room">
            <button onClick={handleStartLearning}>Bắt đầu học</button>
          </div>
        </div>
        <div className="comment-container">
          <div className="comment-list">
            <CommentList courseId={id} key={reloadComments} />
          </div>
          <div className="comment-form"></div>
          <CommentForm courseId={id} onCommentSubmit={handleCommentSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
