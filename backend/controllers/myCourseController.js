const db = require("../models/db");

const getMyCourseByUserId = (req, res) => {
  const userId = req.session.user_id;
  if (!userId) {
    return res.status(400).json({ error: "Missing user_id in session." });
  }
  console.log(userId);
  const query = "SELECT * FROM mycourse WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error while get value from database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (results.length === 0) {
        res.status(404).json({ message: "Bạn chưa có khoá học nào" });
      } else {
        res.json({ results });
      }
    }
  });
};

const checkout = (req, res) => {
  const userId = req.session.user_id;
  const cartItems = req.body.cartItems;

  if (!userId) {
    return res.status(400).json({ error: "Missing user_id in session." });
  }
  const query =
    "INSERT INTO mycourse (user_id, course_id, title, price) VALUES ?";
  const values = cartItems.map((item) => [
    userId,
    item.id,
    item.title,
    item.price,
  ]);
  console.log(values);
  db.query(query, [values], (err, results) => {
    if (err) {
      console.error("Error while get value from database:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("Order saved to database");
      res.status(200).send("Order successful");
    }
  });
};

module.exports = {
  getMyCourseByUserId,
  checkout,
};
