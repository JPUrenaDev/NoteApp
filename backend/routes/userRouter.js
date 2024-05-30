const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
router
  .route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

router.route("/login").post(userController.login);

module.exports = router;
