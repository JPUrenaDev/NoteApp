const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/connection.js");
const bcrypt = require("bcrypt");
const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  userName: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },

  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
