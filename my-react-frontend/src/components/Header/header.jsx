import React from "react";
import "./Header.css";

function header() {
  return (
    <div className="header">
      <div className="header-left">
        <img
          className="logo "
          src="https://techinplay.edu.vn/assets/desktop/images/logo.png"
        />
      </div>
      <div className="header-center">
        <ul className="header-lists">
          <li>
            <a href="#">TRANG CHỦ</a>
          </li>
          <li>
            <a href="#">GIỚI THIỆU</a>
          </li>
          <div className="header-center-menu">
            <a href="#">CÁC KHOÁ HỌC</a>
            <div className="dropDown-items">
              <a href="#">KHÓA HỌC LẬP TRÌNH SÁNG TẠO SCRATCH</a>
              <a href="#">Khóa Học Lego Wedo</a>
              <a href="#">KHÓA HỌC LẬP TRÌNH PYTHON DÀNH CHO HỌC SINH</a>
              <a href="#">KHÓA HỌC LẬP TRÌNH WEBSITE DÀNH CHO HỌC SINH</a>
              <a href="#">KHÓA HỌC LẬP TRÌNH JAVASCRIPT DÀNH CHO HỌC SINH</a>
              <a href="#">KHÓA HỌC LẬP TRÌNH JAVA DÀNH CHO HỌC SINH</a>
            </div>
          </div>
          <div className="header-center-menu">
            <a href="#">HOẠT ĐỘNG</a>
            <div className="dropDown-items">
              <a href="#">LEGO ROBOTIC</a>
            </div>
          </div>
          <li>
            <a href="#">GÓC PHỤ HUYNH</a>
          </li>
          <li>
            <a href="#">TIN TỨC</a>
          </li>
          <li>
            <a href="#">TUYỂN SINH</a>
          </li>
          <li>
            <a href="#">GIẢNG VIÊN</a>
          </li>
        </ul>
      </div>
      <div className="header-right">
        <button>ĐĂNG NHẬP</button>
        <button>ĐĂNG XUẤT</button>
      </div>
    </div>
  );
}

export default header;
