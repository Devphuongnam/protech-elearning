import React, { useState, useEffect } from "react";
import "./MyCourse.css";
const MyCourse = () => {
  const [userId, setUserId] = useState(null);
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    // Gửi yêu cầu đến API để kiểm tra user đã đăng nhập và lấy userId
    fetch("http://localhost:8081/protected", { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.user_id) {
          setUserId(data.user_id);
          console.log(userId);

          // Nếu đã đăng nhập, gửi yêu cầu đến API để lấy danh sách khoá học của người dùng
          fetch(`http://localhost:8081/api/mycourse?userId=${data.user_id}`, {
            credentials: "include",
          })
            .then((response) => response.json())
            .then((courseData) => {
              console.log(courseData);
              setMyCourses(courseData.results);
            })
            .catch((error) =>
              console.error("Lỗi khi lấy danh sách khoá học:", error)
            );
        }
      })
      .catch((error) => console.error("Lỗi khi kiểm tra đăng nhập:", error));
  }, []); // useEffect sẽ chạy một lần sau khi component được render

  return (
    <div className="my-courses-container">
      <h2 className="course-list-title">Danh sách khoá học của bạn</h2>
      {myCourses && myCourses.length > 0 ? (
        myCourses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="course-info">
              <p className="course-title1">{course.title}</p>
              <p className="course-price1">${course.price} - Đã thanh toán</p>
              <p className="course-time-buy">
                Ngày mua: {course.createdAt.slice(0, 10)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="empty-state">Bạn không có khoá học nào.</div>
      )}
    </div>
  );
};

export default MyCourse;
