const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const coursesRoutes = require("./routes/coursesRoutes");
const lessonsRoutes = require("./routes/lessonsRouter");
const commentsRoutes = require("./routes/commentsRoutes.js");
const questionsRoutes = require("./routes/questionsRoutes.js");
const myCourseRoutes = require("./routes/myCourseRoutes.js");
const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

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
  const sql = "SELECT * FROM login WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      return res.json({ Message: "Error inside Server" });
    }
    if (data.length > 0) {
      req.session.user_id = data[0].id;
      req.session.name = data[0].name;
      req.session.email = data[0].email;

      return res.json({
        Login: true,
        name: req.session.name,
        email: req.session.email,
      });
    } else {
      return res.json({ Login: false });
    }
  });
});

app.get("/protected", (req, res) => {
  // Kiểm tra xem user đã đăng nhập chưa
  if (req.session.user_id) {
    res.status(200).json({
      message: "Người dùng đã đăng nhập",
      user_id: req.session.user_id,
    });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Route đăng xuất
app.post("/logout", (req, res) => {
  // Xóa thông tin người dùng khỏi session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    res.status(200).json({ success: true });
  });
});

app.get("/name", async (req, res) => {
  if ((req.session.name, req.session.email)) {
    return res.json({
      valid: true,
      name: req.session.name,
      email: req.session.email,
    });
  }
  {
    return res.json({ valid: false });
  }
});

// API endpoint để xử lý đăng nhập
app.post("/api/admin/login", (req, res) => {
  const { username, password } = req.body;

  // Truy vấn để kiểm tra thông tin đăng nhập
  const sql = "SELECT * FROM admin_login WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res
        .status(500)
        .json({ success: false, message: "Lỗi trong quá trình xác thực" });
    } else {
      if (results.length > 0) {
        res.json({ success: true, message: "Đăng nhập thành công" });
      } else {
        res.status(401).json({
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        });
      }
    }
  });
});

app.use("/api", coursesRoutes);

app.use("/api", lessonsRoutes);

app.use("/api", commentsRoutes);

app.use("/api", questionsRoutes);

app.use("/api", myCourseRoutes);

app.listen(8081, () => {
  console.log("Server đang lắng nghe trên cổng " + 8081);
});
