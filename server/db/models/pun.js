const Sequelize = require("sequelize");
const db = require("../db");

const Pun = db.define("pun", {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  author: {
    type: Sequelize.STRING,
    defaultValue: "anonymous",
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 0,
      notEmpty: true,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 0,
      notEmpty: true,
    },
  },
});

//instance method or hook or getters and setters or virtual methods to set price using pennies
module.exports = Pun;
