const List = require("../models").List;

module.exports = {


  getAllLists(callback){
    return List.findAll()
    .then((lists) => {
      callback(null, lists);
    })
    .catch((err) => {
      callback(err);
    })
  },
  addList(newList, callback){
      return List.create({
        title: newList.title,
        description: newList.description,
        private: newList.private,
        userId: newList.userId
      })
      .then((list) => {
        callback(null, list);
      })
      .catch((err) => {
        callback(err);
      })
    },
  getList(id, callback){
     return List.findByPk(id)
     .then((list) => {
       callback(null, list);
     })
     .catch((err) => {
       callback(err);
     })
   },
   deleteList(id, callback){
      return List.destroy({
        where: {id}
      })
      .then((list) => {
        callback(null, list);
      })
      .catch((err) => {
        callback(err);
      })
    }
}
