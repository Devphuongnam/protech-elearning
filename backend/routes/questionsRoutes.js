const express = require("express");
const questionsController = require("../controllers/questionsController");

const router = express.Router();

router.get(
  "/courses/:id/questions",
  questionsController.getQuestionsByCourseId
);

module.exports = router;
