import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [name, setName] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const handleProfilePageClick = () => {
    navigate("/personal-page");
  };
  const MyCourse = () => {
    navigate("/my-course");
  };
  const handleProfileClick = () => {
    setShowOptions(!showOptions);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/name")
      .then((res) => {
        if (res.data.valid) {
          axios.defaults.withCredentials = true;
          setName(res.data.name);
          setIsLoggedIn(true);
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };
  return (
    <div className="user-info">
      {isLoggedIn ? (
        <p onClick={handleProfileClick}>Xin chào, {name}!</p>
      ) : (
        <NavLink to="/login" className="btn btn-primary">
          Đăng nhập
        </NavLink>
      )}
      {showOptions && (
        <div className="options">
          <ul>
            <li onClick={handleProfilePageClick}>Thông tin cá nhân</li>
            <li onClick={MyCourse}>Khóa học của tôi</li>
            <li onClick={handleLogout}>Đăng xuất</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
