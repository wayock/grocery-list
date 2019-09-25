const express = require("express");
const router = express.Router();
const groceryController = require("../controllers/groceryController");

router.get("/groceries", groceryController.index);
router.get("/groceries/new", groceryController.new);


module.exports = router;
