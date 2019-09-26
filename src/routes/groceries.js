const express = require("express");
const router = express.Router();
const groceryController = require("../controllers/groceryController");

router.get("/groceries", groceryController.index);
router.get("/groceries/new", groceryController.new);
router.get("/groceries/:id", groceryController.show);
router.post("/groceries/create", groceryController.create);
router.post("/groceries/:id/destroy", groceryController.destroy);

module.exports = router;
