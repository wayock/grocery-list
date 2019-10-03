const express = require("express");
const validation = require("./validation");
const router = express.Router();
const groceryController = require("../controllers/groceryController");

// router.get("/groceries", groceryController.index);
router.get("/lists/:listId/groceries/new", groceryController.new);
router.get("/lists/:listId/groceries/:id", groceryController.show);
router.get("/lists/:listId/groceries/:id/edit", groceryController.edit);
router.post("/lists/:listId/groceries/create", validation.validateGroceries, groceryController.create);
router.post("/lists/:listId/groceries/:id/destroy",  groceryController.destroy);
router.post("/lists/:listId/groceries/:id/update", validation.validateGroceries, groceryController.update);
router.get("/lists/:listId/groceries/:id/purchased", groceryController.togglePurchase);

module.exports = router;
