const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
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
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
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

app.get("/user", async (req, res) => {
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

app.listen(8081, () => {
  console.log("Server đang lắng nghe trên cổng " + 8081);
});
