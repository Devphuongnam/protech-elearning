const db = require("../models/db");

const getAllCourses = (req, res) => {
  const query = "SELECT * FROM Courses";

  db.query(query, (error, results) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.json(results);
    }
  });
};

const getCourseById = (req, res) => {
  const courseId = req.params.id;
  const query = "SELECT * FROM Courses WHERE id = ?";
  db.query(query, [courseId], (err, results) => {
    if (err) {
      console.error("Lỗi khi truy vấn dữ liệu từ MySQL:", err);
      res.status(500).json({ message: "Lỗi khi truy vấn dữ liệu từ MySQL" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "Không tìm thấy khoá học" });
      } else {
        res.json(results[0]);
      }
    }
  });
};

module.exports = {
  getAllCourses,
  getCourseById,
};
