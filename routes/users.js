const express = require("express");
const router = express.Router();
const UserController = require('../controllers/user-controllers');
const login = require('../routes/middleware/login');

router.get("/cadastro",login.obrigatorio, UserController.getUsers);

router.post("/cadastro", UserController.postUsers);

router.post("/login", UserController.authUser);
router.get("/cadastro/:id_user",login.obrigatorio, UserController.getUserId);
router.patch("/cadastro",login.obrigatorio, UserController.pathUser);

module.exports = router;
