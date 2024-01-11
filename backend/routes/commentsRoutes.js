const express = require("express");
const commentsController = require("../controllers/commentsController");

const router = express.Router();

// Định nghĩa route GET /api/courses
router.post("/courses/:id/comments", commentsController.postComments);
router.get("/courses/:id/comments", commentsController.getAllComments);

module.exports = router;
