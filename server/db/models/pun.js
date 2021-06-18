const Sequelize = require('sequelize');
const db = require('../db');

const Pun = db.define('pun', {
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  author: {
    type: Sequelize.STRING,
    defaultValue: 'anonymous',
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: true,
      isInt: true,
      min: 1,
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

//1. instance method or 2. hook or 3. getters and setters or 4. virtual methods to set price using pennies

//convert price to dollars from pennies
Pun.beforeSave((pun) => {
  pun.price = pun.price / 100;
});
module.exports = Pun;
