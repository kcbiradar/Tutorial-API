const { DataTypes } = require("sequelize");

const sequelize = require("../config/config.js");

const Tutorial = sequelize.define(
  "Tutorials",
  {
    tutorial_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    published: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Tutorial;
