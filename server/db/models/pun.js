const Sequelize = require("sequelize");
const db = require("../db");

const Pun = db.define("pun", {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    defaultValue: "anonymous",
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isNumeric: true,
      isDecimal: true,
      min: 0,
    },
  },
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 0,
    },
  },
});

module.exports = Pun;
