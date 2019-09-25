const Grocery = require("../models").Grocery;

module.exports = {

//#1
  getAllGroceries(callback){
    return Grocery.findAll()

//#2
    .then((groceries) => {
      callback(null, groceries);
    })
    .catch((err) => {
      callback(err);
    })
  }
}
