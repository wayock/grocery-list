const List = require("../models").List;
const Grocery = require("../models").Grocery;

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
      .then(list => {
        callback(null, list);
      })
      .catch(err => {
        callback(err);
      });
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

  updateList(id, updatedList, callback) {
    return List.findByPk(id).then(list => {
      if (!list) {
        return callback("List not found");
      }

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
    });
  }
};
