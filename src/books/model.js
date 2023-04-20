const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Book = connection.define("Book", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.BIGINT,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Book;
