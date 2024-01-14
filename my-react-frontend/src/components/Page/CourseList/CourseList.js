// src/components/CoursesList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CourseList.css";
import SearchBar from "../../Search/Search";
import { Link } from "react-router-dom";
import { CartProvider, useCart } from "../../Cart/CartContext";

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [sortByPrice, setSortByPrice] = useState(false);
  const [sortByName, setSortByName] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { dispatch } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/courses");
        let sortedCourses = [...response.data];

        // Áp dụng tìm kiếm theo tên nếu có từ khóa
        if (searchTerm) {
          sortedCourses = sortedCourses.filter((course) =>
            course.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        // Sắp xếp dữ liệu theo giá nếu được chọn
        if (sortByPrice) {
          sortedCourses = sortedCourses.sort((a, b) => a.price - b.price);
        } else {
          sortedCourses = sortedCourses.sort((a, b) => b.price - a.price);
        }

        // Sắp xếp dữ liệu theo tên nếu được chọn
        if (sortByName) {
          sortedCourses = sortedCourses.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        }
        setCourses(sortedCourses);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ API:", error);
      }
    };

    fetchData();
  }, [sortByPrice, sortByName, searchTerm]);

  const addToCart = (course) => {
    dispatch({ type: "ADD_TO_CART", payload: course });
    console.log(`Đã thêm khoá học với ID: ${course.id} vào giỏ hàng`);
  };

  return (
    <div className="course-list">
      <h1>Danh sách khoá học</h1>
      <div className="course-sort-top">
        <div className="course-sort">
          <button onClick={() => setSortByPrice(!sortByPrice)}>
            Sắp xếp theo giá: {sortByPrice ? "tăng dần" : "giảm dần"}
          </button>
          <button onClick={() => setSortByName(!sortByName)}>
            Sắp xếp theo tên: {sortByName ? "A-Z" : "Z-A"}
          </button>
        </div>
        <div className="search-course">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
      </div>
      <ul className="course-container">
        {courses.map((course) => (
          <li key={course.id}>
            <Link to={`/course/${course.id}`}>
              <img src={course.image_url} alt={course.title} />
              <h3>{course.title}</h3>
              <p>{course.description.substring(0, 100)}...</p>
              <p style={{ fontWeight: "bold", fontStyle: "italic" }}>
                Giá: {course.price}$
              </p>
            </Link>
            {course.addedToCart ? (
              <p>Khoá học đã được thêm vào giỏ hàng</p>
            ) : (
              <button onClick={() => addToCart(course)}>
                Thêm vào giỏ hàng
              </button>
            )}
            {/* <button onClick={() => addToCart(course)}>Add to Cart</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesList;
