module.exports = {
  validateGroceries(req, res, next) {

//#1
    if(req.method === "POST") {

//#2
      req.checkParams("listId", "must be valid").notEmpty().isInt();
      req.checkBody("Grocery item", " cannot be empty").isLength({min: 1});
    }

//#3
    const errors = req.validationErrors();

    if (errors) {

//#4
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  },

  validateLists(req, res, next) {

//#1
    if(req.method === "POST") {

//#2

      req.checkBody("List title", " cannot be empty").isLength({min: 1});
    }

//#3
    const errors = req.validationErrors();

    if (errors) {

//#4
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer)
    } else {
      return next();
    }
  }
}
