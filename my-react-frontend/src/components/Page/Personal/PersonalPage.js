import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PersonalPage.css";
import Header from "../../Header/Header";

const PersonalPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/name")
      .then((res) => {
        if (res.data.valid) {
          setName(res.data.name);
          setEmail(res.data.email);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <Header />
      <div personal-page>
        <div className="personal-user">
          <h2>Thông tin của bạn</h2>
          <div className="personal-user-detail">
            <p>Tên: {name}</p>
            <p>Địa chỉ email: {email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalPage;
