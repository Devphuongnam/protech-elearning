// models/db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

db.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối đến MySQL:", err);
  } else {
    console.log("Đã kết nối thành công đến MySQL");
  }
});

module.exports = db;
