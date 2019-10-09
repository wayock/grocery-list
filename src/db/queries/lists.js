const List = require("../models").List;
const Grocery = require("../models").Grocery;
const Authorizer = require("../../policies/lists")

module.exports = {
  getAllLists(callback) {
    return List.findAll()
      .then(lists => {
        callback(null, lists);
      })
      .catch(err => {
        callback(err);
      });
  },
  addList(newList, callback) {
    return List.create({
      title: newList.title,
      description: newList.description,
      private: newList.private,
      userId: newList.userId
    })
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
  },
  getList(id, callback) {
    return List.findByPk(id,{
      include: [{
        model: Grocery,
        as: "groceries"
      }]
    })
  },
  deleteList(id, callback) {
    return List.destroy({
      where: { id }
    })
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
  },
  deletePurchased(id, callback) {
    return Grocery.destroy({
      where: { listId: id, purchased: true }
    })
      .then(() => {
        callback(null, id);
      })
      .catch(err => {
        callback(err);
      });
  },
  editList(id, callback) {
   return List.findByPk(id,{
     include: [{
       model: Grocery,
       as: "groceries"
     }]
   })
     .then(list => {
       callback(null, list);
     })
     .catch(err => {
       callback(err);
     });
 },

  updateList(req, updatedList, callback) {
    return List.findByPk(req.params.id).then(list => {
      if (!list) {
        return callback("List not found");
      }

      const authorized = new Authorizer(req.user, list).update();

       if(authorized) {

        list
          .update(updatedList, {
            fields: Object.keys(updatedList)
          })
          .then(() => {
            callback(null, list);
          })
          .catch(err => {
            callback(err);
          });
        } else {
          req.flash("notice", "You are not authorized to do that.");
          callback("Forbidden");
        }
    });
  }
};
