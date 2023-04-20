const { DataTypes } = require("sequelize");
const connection = require("../db/connection");

const Genre = connection.define("Genre", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.BIGINT,
    unique: true,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
module.exports = Genre;
