'use strict';
module.exports = (sequelize, DataTypes) => {
  const Grocery = sequelize.define('Grocery', {
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: DataTypes.STRING,
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    purchased: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    listId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Grocery.associate = function(models) {
    // associations can be defined here
    Grocery.belongsTo(models.List, {
      foreignKey: "listId",
      onDelete: "CASCADE"
    });
    Grocery.belongsTo(models.User, {
     foreignKey: "userId",
     onDelete: "CASCADE"
   });
  };
  return Grocery;
};
