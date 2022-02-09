const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user-controllers');
const login = require('../routes/middleware/login');

router.get("/cadastro", UserController.getUsers);

router.post("/cadastro", UserController.postUsers);

router.post("/login", UserController.authUser);

module.exports = router;
