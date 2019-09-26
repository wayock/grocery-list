const groceryQueries = require("../db/queries/groceries.js");

module.exports = {
  index(req, res, next){
    groceryQueries.getAllGroceries((err, groceries) => {
       if(err){
         res.redirect(500, "static/index");
       } else {
         res.render("groceries/index", {groceries});
       }
     })
  },
  new(req, res, next){
    res.render("groceries/new");
  },
  create(req, res, next){
    let newGrocery = {
      item: req.body.item,
      note: req.body.note,
      quantity: req.body.quantity,
      purchased: req.body.purchased,
      userId: req.body.userId
    };
    groceryQueries.addGroceries(newGrocery, (err, grocery) => {
      if(err){
        res.redirect(500, "/groceries/new");
      } else {
        res.redirect(303, "/groceries")
      }
    });
  },
  show(req, res, next){
    groceryQueries.getGrocery(req.params.id, (err, grocery) => {
      if(err || grocery == null){
        res.redirect(404, "/");
      } else {
        res.render("groceries/show", {grocery});
      }
    });
  },
  destroy(req, res, next){
    groceryQueries.deleteGrocery(req.params.id, (err, grocery) => {
      if(err){
        res.redirect(500, `/groceries/${grocery.id}`)
      } else {
        res.redirect(303, "/groceries")
      }
    });
  }

}
