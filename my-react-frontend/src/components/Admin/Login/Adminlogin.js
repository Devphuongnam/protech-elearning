// src/components/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Adminlogin.css"; // Import file CSS

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/api/admin/login",
        {
          username,
          password,
        }
      );

      if (response.data.success) {
        // Xử lý đăng nhập thành công (chuyển hướng, lưu thông tin người dùng vào localStorage, vv.)
        localStorage.setItem("adminToken", response.data.token);
        navigate("/admin/home");
        console.log("Đăng nhập thành công");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Lỗi trong quá trình xác thực");
    }
  };

  return (
    <div className="login-container">
      <h2>Đănh nhập cho Admin</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
