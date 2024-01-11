const db = require("../models/db");

const getQuestionsByCourseId = (req, res) => {
  const courseId = req.params.id;
  const query = `SELECT * FROM questions WHERE courseId = ${courseId}`;
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
  getQuestionsByCourseId,
};
