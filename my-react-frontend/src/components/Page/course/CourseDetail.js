import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import courses from "./data";
import "./coursedetail.css";
import Header from "../../Header/Header";
import Slidetop from "../../Slidetop/Slidetop";
import Comment from "../../Comment/comment";

const CourseDetail = () => {
  const { id } = useParams();
  const course = courses.find((c) => c.id === parseInt(id, 10));
  console.log(course);
  const breadcrumb = [
    { label: "Trang chủ", path: "/" },
    { label: "Danh sách khoá học", path: "/" },
    { label: course.name, path: "/" },
  ];
  const [comments, setComments] = useState(["Bình luận 1", "Bình luận 2"]);

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
  };
  if (!course) {
    return <p>Khoá học không tồn tại.</p>;
  }

  return (
    <div className="course-detail">
      <Header />
      <Slidetop />
      <nav className="breadcrumb-top">
        <ul className="breadcrumb">
          {breadcrumb.map((item, index) => (
            <React.Fragment key={index}>
              <li>
                <Link to={item.path}>{item.label}</Link>
              </li>
              {index < breadcrumb.length - 1 && <span>/</span>}
            </React.Fragment>
          ))}
        </ul>
      </nav>
      <div className="course-interview">
        {/* <div className="course-name">{course.name}</div> */}
        <div className="course-name">
          <i class="fa fa-graduation-cap" aria-hidden="true">
            {course.name}
          </i>
        </div>
        <div className="course-description">{course.description}</div>
        <div className="course-detail-description">{course.detail}</div>
        {/* <div className="course-price">${course.price}</div> */}
        <div className="course-image">
          <img src={course.image} alt={course.name} />
        </div>
        <div className="enter-room">
          <button
            className="button-sumit-enter"
            style={{ background: "#198754", color: "white" }}
          >
            Vào học
          </button>
        </div>
        <div className="course-comment">
          <Comment comments={comments} onAddComment={handleAddComment} />
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
