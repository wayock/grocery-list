'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: {
       type: DataTypes.STRING,
       allowNull: false
     },
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  List.associate = function(models) {
    // associations can be defined here
    List.hasMany(models.Grocery, {
      foreignKey: "listId",
      as: "groceries"
    });
  };
  return List;
};
