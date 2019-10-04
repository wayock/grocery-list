const Grocery = require("../models").Grocery;
const List = require("../models").List;
const User = require("../models").List;

module.exports = {
  // getAllGroceries(callback) {
  //   return Grocery.findAll()
  //
  //     .then(groceries => {
  //       callback(null, groceries);
  //     })
  //     .catch(err => {
  //       callback(err);
  //     });
  // },

  getGrocery(id, callback) {
    return Grocery.findByPk(id)
      .then(grocery => {
        callback(null, grocery);
      })
      .catch(err => {
        callback(err);
      });
  },

  addGroceries(newGrocery, callback) {
    return Grocery.create(newGrocery)
      .then(grocery => {
        callback(null, grocery);
      })
      .catch(err => {
        callback(err);
      });
  },

  deleteGrocery(id, callback) {
    return Grocery.destroy({
      where: { id }
    })
      .then(deletedRecordsCount => {
        callback(null, deletedRecordsCount);
      })
      .catch(err => {
        callback(err);
      });
  },

  updateGrocery(id, updatedGrocery, callback) {
    return Grocery.findByPk(id).then(grocery => {
      if (!grocery) {
        return callback("Grocery item not found");
      }
      grocery
        .update(updatedGrocery, {
          fields: Object.keys(updatedGrocery)
        })
        .then(() => {
          callback(null, grocery);
        })
        .catch(err => {
          callback(err);
        });
    });
  },
  togglePurchase(id, callback) {
    return Grocery.findByPk(id).then(grocery => {
      if (!grocery) {
        return callback("Grocery item not found");
      }
      grocery
        .update({purchased: !grocery.purchased})
        .then(() => {
          callback(null, grocery);
        })
        .catch(err => {
          callback(err);
        });
    });
  }
};
