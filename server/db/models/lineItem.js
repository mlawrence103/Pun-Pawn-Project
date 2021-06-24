const Sequelize = require("sequelize");
const db = require("../db");

const LineItem = db.define("lineItem", {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 1,
    },
    defaultValue: 1,
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 1,
    },
  },
});

module.exports = LineItem;
