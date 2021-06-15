const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    status : {
        type: Sequelize.ENUM('open', 'fulfilled'),
        allowNull: false
    },
    emailAdress:{
        type: sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    shippingAdressName: {
        type: Sequelize.string
    },
    shippingAdressStreet: {
        type: Sequelize.STRING
    },
    shippingAdressCity:{
        type: Sequelize.STRING
    },
    shippingAdressState:{
        type: Sequelize.STRING
    },
    shippingAdressZip:{
        type: Sequelize.STRING
    }
  })
  
  module.exports = Order
