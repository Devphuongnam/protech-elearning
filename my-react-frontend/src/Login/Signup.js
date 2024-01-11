import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
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
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          alert("Đăng ký thành công");
          navigate("/login");
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setErrorMessage("Email đã được sử dụng. Vui lòng chọn email khác.");
          } else {
            console.error("error:", error);
          }
        });
    }
  };
  return (
    <section className="">
      <div className="px-4 py-5 pt-5 px-md-5 mx-auto text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-10">
              <h1 className="my-5 display-3 fw-bold ls-tight">
                CÔNG TY GIÁO DỤC <br />
                <span className="text-success">PROTECH</span>
              </h1>
              <p style={{ color: "hsl(217, 10%, 50.8%)" }}>
                Hệ thống Website học trực tuyến
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 ">
              <div className="card">
                <div className="card-body py-5 px-md-5 bg-light">
                  <form action="" onSubmit={handleSubmit}>
                    <h2>Đăng ký</h2>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="name">
                        <strong>Name</strong>
                      </label>
                      <input
                        type="text"
                        placeholder="Nhập Tên của bạn"
                        name="name"
                        onChange={handleInput}
                        className="form-control"
                      />
                      {errors.name && (
                        <span className="text-danger">{errors.name}</span>
                      )}
                    </div>
                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="email">
                        <strong>Email</strong>
                      </label>
                      <input
                        type="email"
                        placeholder="Nhập Email"
                        name="email"
                        onChange={handleInput}
                        className="form-control"
                      />
                      {errorMessage && (
                        <div style={{ color: "red" }}>{errorMessage}</div>
                      )}
                      {errors.email && (
                        <span className="text-danger">{errors.email}</span>
                      )}
                    </div>

                    <div className="form-outline mb-4">
                      <label className="form-label" htmlFor="password">
                        <strong>Mật Khẩu</strong>
                      </label>
                      <input
                        type="password"
                        placeholder="Nhập Mật Khẩu"
                        name="password"
                        onChange={handleInput}
                        className="form-control"
                      />
                      {errors.password && (
                        <span className="text-danger">{errors.password}</span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn btn-secondary">
                        Đăng ký
                      </button>

                      <Link to="/login" className="btn btn-success">
                        Đăng nhập
                      </Link>
                    </div>

                    <div className="text-center">
                      <p>Hoặc đăng nhập với</p>
                      <button
                        className="btn btn-primary"
                        style={{ backgroundColor: "#dd4b39" }}
                        type="submit"
                      >
                        <i className="fa fa-google"></i> Google
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Signup;
