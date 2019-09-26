const express = require("express");
const router = express.Router();
const groceryController = require("../controllers/groceryController");

router.get("/groceries", groceryController.index);
router.get("/groceries/new", groceryController.new);
router.post("/groceries/create", groceryController.create);

module.exports = router;
