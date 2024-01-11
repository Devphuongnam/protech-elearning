// routes/coursesRoutes.js
const express = require("express");
const coursesController = require("../controllers/coursesController");

const router = express.Router();

// Định nghĩa route GET /api/courses
router.get("/courses", coursesController.getAllCourses);
router.get("/courses/:id", coursesController.getCourseById);

module.exports = router;
