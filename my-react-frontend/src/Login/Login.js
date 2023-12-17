import "bootstrap/dist/css/bootstrap.min.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./LoginValidation";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../context/Authprovider";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  // const auth = getAuth();
  // const { user } = useContext(AuthContext);

  // const handleLoginWithGoogle = async () => {
  //   const provider = new GoogleAuthProvider();
  //   const res = await signInWithPopup(auth, provider);
  //   console.log({ res });
  // };

  // if (user?.uid) {
  //   navigate("/");
  //   return;
  // }

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081/name")
      .then((res) => {
        if (res.data.valid) {
          navigate("/");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(Validation(values));
    if (errors.email === "" && errors.password === "") {
      await axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data.Login) {
            navigate("/");
          } else {
            setErrorMessage("Email hoặc mật khẩu không đúng");
          }
        })
        .catch((err) => console.log(err));
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

                    {/* <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className="form-check-input me-2"
                        type="checkbox"
                        value="0"
                      />
                      <label className="form-check-label">
                        Ghi nhớ đăng nhập
                      </label>
                    </div> */}

                    <div className="d-flex justify-content-between">
                      <button type="submit" className="btn btn-success">
                        Đăng nhập
                      </button>

                      <Link to="/signup" className="btn btn-secondary">
                        Đăng ký
                      </Link>
                    </div>
                  </form>

                  {/* <div className="text-center">
                    <p>Hoặc đăng nhập với</p>
                    <button
                      className="btn btn-primary"
                      style={{ backgroundColor: "#dd4b39" }}
                      onClick={handleLoginWithGoogle}
                    >
                      <i className="fa fa-google"></i> Google
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
