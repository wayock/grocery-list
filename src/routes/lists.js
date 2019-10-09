const express = require("express");
const router = express.Router();
const validation = require("./validation");
const listController = require("../controllers/listController")

router.get("/lists", listController.index);
router.get("/lists/new", listController.new);
router.get("/lists/:id", listController.show);
router.get("/api/lists/:id", listController.showAPI);
router.get("/lists/:id/edit", listController.edit);
router.post("/lists/create", validation.validateLists, listController.create);
router.post("/lists/:id/destroy", listController.destroy);
router.post("/lists/:id/destroy/purchased", listController.destroyPurchased);
router.post("/lists/:id/update", validation.validateLists, listController.update);

module.exports = router;
