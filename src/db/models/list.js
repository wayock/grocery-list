'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    private: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {});
  List.associate = function(models) {
    // associations can be defined here
  };
  return List;
};