const db = require("../models/db");

const getLessonsByCourseId = (req, res) => {
  const courseId = req.params.id;
  const query = `SELECT * FROM lessons WHERE courseId = ${courseId}`;
  db.query(query, (error, results) => {
    if (error) {
      console.log("Lỗi khi truy vấn giữ liệu từ MySQL:", error);
      res.status(500).json({ message: error.message });
    } else {
      res.json(results);
    }
  });
};

const getLessonById = async (req, res) => {
  const courseId = req.params.id;
  const lessonId = req.params.lessonId;
  const query = `SELECT * FROM lessons WHERE courseId = ${courseId} AND id = ${lessonId}`;
  db.query(query, (error, results) => {
    if (error) {
      console.log("Lỗi khi truy vấn giữ liệu từ MySQL:", error);
      res.status(500).json({ message: error.message });
    } else {
      res.json(results);
    }
  });
};

module.exports = {
  getLessonsByCourseId,
  getLessonById,
};
