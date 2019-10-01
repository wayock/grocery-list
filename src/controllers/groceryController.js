const groceryQueries = require("../db/queries/groceries.js");
const listQueries = require("../db/queries/lists.js");

module.exports = {
  index(req, res, next) {
    groceryQueries.getAllGroceries((err, groceries) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("groceries/index", { groceries });
      }
    });
  },
  new(req, res, next) {
    res.render("groceries/new", { listId: req.params.listId });
  },
  create(req, res, next) {
    let newGrocery = {
      item: req.body.item,
      note: req.body.note,
      quantity: req.body.quantity,
      purchased: false,
      userId: req.body.userId,
      listId: req.params.listId
    };
    groceryQueries.addGroceries(newGrocery, (err, grocery) => {
      if (err) {
        res.redirect(500, "/groceries/new");
      } else {
        res.redirect(303, `/lists/${newGrocery.listId}`);
      }
    });
  },
  show(req, res, next) {
    groceryQueries.getGrocery(req.params.id, (err, grocery) => {
      if (err || grocery == null) {
        res.redirect(404, "/");
      } else {
        res.render("groceries/show", { grocery });
      }
    });
  },
  destroy(req, res, next) {
    groceryQueries.deleteGrocery(req.params.id, (err, deletedRecordsCount) => {
      if (err) {
        res.redirect(
          500,
          `/lists/${req.params.listId}/groceries/${req.params.id}`
        );
      } else {
        res.redirect(303, `/lists/${req.params.listId}`);
      }
    });
  },
  edit(req, res, next) {
    groceryQueries.getGrocery(req.params.id, (err, grocery) => {
      if (err || grocery == null) {
        res.redirect(404, "/");
      } else {
        res.render("groceries/edit", { grocery });
      }
    });
  },
  update(req, res, next) {
    groceryQueries.updateGrocery(req.params.id, req.body, (err, grocery) => {
      if (err || grocery == null) {
        res.redirect(404,`/lists/${req.params.listId}/groceries/${req.params.id}/edit`);
      } else {
        res.redirect(`/lists/${req.params.listId}`);
      }
    });
  }
};
