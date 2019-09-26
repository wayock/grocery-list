const Grocery = require("../models").Grocery;

module.exports = {
  getAllGroceries(callback) {
    return Grocery.findAll()

      .then(groceries => {
        callback(null, groceries);
      })
      .catch(err => {
        callback(err);
      });
  },

  addGroceries(newGrocery, callback){
    return Grocery.create({
      item: newGrocery.item,
      note: newGrocery.note,
      quantity: newGrocery.quantity,
      purchased: newGrocery.purchased,
      userId: newGrocery.userId
    })
    .then((grocery) => {
      callback(null, grocery);
    })
    .catch((err) => {
      callback(err);
    })
  }
};
