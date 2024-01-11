// Trong file AdminHome.js hoặc component tương tự

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra điều kiện nếu người dùng đã đăng nhập (ví dụ: kiểm tra token trong localStorage)
    const isAdminAuthenticated = localStorage.getItem("adminToken");

    // Nếu đã đăng nhập, giữ người dùng ở trang AdminHome
    if (isAdminAuthenticated) {
      return;
    }

    // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
    navigate("/admin/login");
  }, [navigate]);

  // Nội dung của trang AdminHome
  return (
    <div>
      <h1>Admin Home</h1>
      {/* Nội dung khác của trang */}
    </div>
  );
};

export default AdminHome;
