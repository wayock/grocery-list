const express = require("express");
const router = express.Router();
const groceryController = require("../controllers/groceryController");

router.get("/groceries", groceryController.index);

module.exports = router;
