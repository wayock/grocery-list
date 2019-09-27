'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grocery = sequelize.define('Grocery', {
    item: DataTypes.STRING,
    note: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    purchased: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  Grocery.associate = function(models) {
    // associations can be defined here
  };
  return Grocery;
};
