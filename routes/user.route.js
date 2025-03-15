const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/", userController.GetAllUsers);
router.post("/", userController.CreateUser);


module.exports = router;