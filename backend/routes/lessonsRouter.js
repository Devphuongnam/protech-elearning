const express = require("express");
const lessonsController = require("../controllers/lessonsController");

const router = express.Router();

router.get("/courses/:id/lessons", lessonsController.getLessonsByCourseId);
router.get("/courses/:id/lessons/:lessonId", lessonsController.getLessonById);

module.exports = router;
