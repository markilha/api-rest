const express = require("express");
const router = express.Router();
const login = require('./middleware/login');
const LoteController = require("../controllers/lotes-controllers")

router.get("/", login.obrigatorio,LoteController.getLotes);

router.get("/:id_lote",login.obrigatorio, LoteController.getLoteId);

router.patch("/",login.obrigatorio, LoteController.pathLote);

router.delete("/",login.obrigatorio, LoteController.deleteLote);

module.exports = router;
