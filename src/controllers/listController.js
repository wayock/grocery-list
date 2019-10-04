const listQueries = require("../db/queries/lists.js");

module.exports = {
  index(req, res, next) {
    listQueries.getAllLists((err, lists) => {
      if (err) {
        res.redirect(500, "static/index");
      } else {
        res.render("lists/index", { lists });
      }
    });
  },
  new(req, res, next) {
    res.render("lists/new");
  },

  create(req, res, next) {
    let newList = {
      title: req.body.title,
      description: req.body.description,
      private: req.body.private,
      userId: 1 // req.body.userId
    };
    listQueries.addList(newList, (err, list) => {
      if (err) {
        res.redirect(500, "/lists/new");
      } else {
        res.redirect(303, "/lists");
      }
    });
  },

  show(req, res, next) {
    listQueries.getList(req.params.id, (err, list) => {
      if (err || list == null) {
        res.redirect(404, "/");
      } else {
        res.render("lists/show", { list });
      }
    });
  },

  destroy(req, res, next) {
    listQueries.deleteList(req.params.id, (err, list) => {
      if (err) {
        res.redirect(500, `/lists/${list.id}`);
      } else {
        res.redirect(303, "/lists");
      }
    });
  },
  destroyPurchased(req, res, next) {
    listQueries.deletePurchased(req.params.id, (err, id) => {
      if (err) {
        res.redirect(500, `/lists/${id}`);
      } else {
        res.redirect(303, `/lists/${id}`);
      }
    });
  },

  edit(req, res, next) {
    listQueries.getList(req.params.id, (err, list) => {
      if (err || list == null) {
        res.redirect(404, "/");
      } else {
        res.render("lists/edit", { list });
      }
    });
  },

  update(req, res, next){

//#1
     listQueries.updateList(req.params.id, req.body, (err, list) => {

//#2
       if(err || list == null){
         res.redirect(404, `/lists/${req.params.id}/edit`);
       } else {
         res.redirect(`/lists/`);
       }
     });
   }
};
