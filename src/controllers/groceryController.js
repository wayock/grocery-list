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
  }
}
