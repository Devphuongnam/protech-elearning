const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "signup",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to database");
});

// app.post("/signup", (req, res) => {
//   const sql = "INSERT INTO login (`name`, `email`, `password`) VALUES (?)";
//   const values = [req.body.name, req.body.email, req.body.password];
//   db.query(sql, [values], (err, data) => {
//     if (err) {
//       return res.json("Error");
//     }
//     if (req.body.email) {
//       return res.json("email already exists, please use another email");
//     }
//     return res.json(data);
//   });
// });

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  // Kiểm tra sự trùng lặp
  db.query("SELECT * FROM login WHERE email = ?", [email], (err, values) => {
    if (err) throw err;

    if (values.length > 0) {
      res.status(409).json({ message: "Email already exists" });
    } else {
      // Thêm người dùng vào cơ sở dữ liệu
      db.query(
        "INSERT INTO login (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (err) => {
          if (err) throw err;
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    }
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json("Error");
    }
    if (data.length > 0) {
      return res.json("Success");
    } else {
      return res.json("Faile");
    }
  });
});

app.listen(8081, () => {
  console.log("Server đang lắng nghe trên cổng " + 8081);
});
