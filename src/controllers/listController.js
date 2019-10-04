const listQueries = require("../db/queries/lists.js");
const UserQueries = require("../db/queries/users.js");
const Authorizer = require("../policies/lists");

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
    const authorized = new Authorizer(req.user).new();

    if (authorized) {
      res.render("lists/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/lists");
    }
  },

  create(req, res, next) {
    const authorized = new Authorizer(req.user).create();
    if (authorized) {
      let newList = {
        title: req.body.title,
        description: req.body.description,
        private: req.body.private
      };
      console.log(req.user);
      listQueries.addList(newList, (err, list) => {
        if (err) {
          res.redirect(500, "/lists/new");
        } else {
          res.redirect(303, "/lists");
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/lists");
    }
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
        const authorized = new Authorizer(req.user, list).edit();

         if(authorized){
        res.render("lists/edit", { list });
      } else {
        req.flash("You are not authorized to do that.")
        res.redirect(`/lists/${req.params.id}`)
      }
    }
    });
  },

  update(req, res, next) {
    //#1
    listQueries.updateList(req, req.body, (err, list) => {
      //#2
      if (err || list == null) {
        res.redirect(401, `/lists/${req.params.id}/edit`);
      } else {
        res.redirect(`/lists/`);
      }
    });
  }
};
