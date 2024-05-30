const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db/connection.js");
const Category = require("./Category.js");
const User = require("./User.js");
const Note = sequelize.define("note", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: true },
  content: { type: DataTypes.STRING(100000), allowNull: false },
  status: { type: DataTypes.BOOLEAN, allowNull: false },
  tags: { type: DataTypes.TEXT },
});

//==========================relations

module.exports = Note;
