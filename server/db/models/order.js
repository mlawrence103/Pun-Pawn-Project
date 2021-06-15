const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    status : {
        type: Sequelize.ENUM('open', 'pending', 'fulfilled'),
        allowNull: false
    },
    emailAddress:{
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    shippingAddressName: {
        type: Sequelize.STRING
    },
    shippingAddressStreet: {
        type: Sequelize.STRING
    },
    shippingAddressCity:{
        type: Sequelize.STRING
    },
    shippingAddressState:{
        type: Sequelize.STRING
    },
    shippingAddressZip:{
        type: Sequelize.STRING
    }
  })
  
  module.exports = Order
