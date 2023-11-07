import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data === "Success") {
            navigate("/home");
          } else {
            alert("không có bản ghi nào tồn tại");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div
      className=" d-flex justify-content-center align-items-center vh-100 "
      style={{ backgroundColor: "#508bfc" }}
    >
      <div className="bg-white p-3 rounded w-25">
        <h2>Đăng nhập</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Nhập Email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Mật Khẩu</strong>
            </label>
            <input
              type="password"
              placeholder="Nhập Mật Khẩu"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Đăng nhập
          </button>
          <p className="">Nếu bạn chưa có tài khoản</p>
          <Link
            to="./Signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Đăng ký tài khoản
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
