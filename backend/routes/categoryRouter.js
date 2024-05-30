const express = require("express");
const router = express.Router();

const categoryController = require("../controller/categoryController");

router.route("/").post(categoryController.insertCategory);

module.exports = router;
