const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/connection.js");

const Category = sequelize.define("category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Category;
