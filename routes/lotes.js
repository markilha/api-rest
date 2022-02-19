const express = require("express");
const router = express.Router();
const login = require('./middleware/login');
const LoteController = require("../controllers/lotes-controllers")

router.get("/",LoteController.getLotes);
router.post("/",LoteController.getLotes);
router.get("/:id",LoteController.getLoteId);

router.patch("/", LoteController.pathLote);
router.delete("/:id", LoteController.deleteLote);

module.exports = router;
