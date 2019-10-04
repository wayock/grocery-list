'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
     type: DataTypes.STRING
    },
    email: {
     type: DataTypes.STRING,
     allowNull: false,
     validate: {
       isEmail: { msg: "must be a valid email" }
     }
    },
    password: {
     type: DataTypes.STRING,
     allowNull: false
   },
   role: {
     type: DataTypes.STRING,
     allowNull: false,
     defaultValue: "member"
   }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Grocery, {
       foreignKey: "userId",
       as: "groceries"
     });
    User.prototype.isAdmin = function() {
      return this.role === "admin";
    };
  };
  return User;
};
