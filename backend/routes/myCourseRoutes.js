const express = require("express");
const myCourseController = require("../controllers/myCourseController");

const router = express.Router();

router.get("/mycourse", myCourseController.getMyCourseByUserId);
router.post("/checkout", myCourseController.checkout);

module.exports = router;
