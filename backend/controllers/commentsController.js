const db = require("../models/db");

const postComments = (req, res) => {
  const courseId = req.params.id;
  const comment_text = req.body.comment_text;
  const userId = req.session.user_id;

  const query =
    "INSERT INTO comments (user_id, course_id, comment_text) VALUES (?, ?, ?)";
  db.query(query, [userId, courseId, comment_text], (err, results) => {
    if (err) {
      console.error("Error adding comment to database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.status(201).json({ success: true, commentId: results.insertId });
    }
  });
};

const getAllComments = (req, res) => {
  const courseId = req.params.id;

  // Thực hiện truy vấn SQL để lấy danh sách bình luận dựa trên course_id
  const query =
    "SELECT comments.*, login.name AS user_name FROM comments JOIN login ON comments.user_id = login.id WHERE comments.course_id = ?";
  db.query(query, [courseId], (error, results) => {
    if (error) {
      console.error("Lỗi khi truy vấn dữ liệu từ MySQL:", error);
      res.status(500).json({ message: "Lỗi khi truy vấn dữ liệu từ MySQL" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "Không tìm thấy khoá học" });
      } else {
        res.json(results);
      }
    }
  });
};

module.exports = {
  postComments,
  getAllComments,
};
