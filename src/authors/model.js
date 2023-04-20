const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Author = connection.define("Author", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.BIGINT,
    unique: true,
  },
  authorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Author;
