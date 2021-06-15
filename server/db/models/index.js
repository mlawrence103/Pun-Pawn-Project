// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./database');
const Order = require('./order');
const User = require('./user');
const Pun = require('./pun');

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/).
// Example:
//
// Puppy.belongsTo(Owner)

User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Puns);
Pun.hasMany(User);
Pun.belongsToMany(User);
Order.hasMany(Pun);

module.exports = {
  // Include your models in this exports object as well!
  db,
  Order,
  User,
  Pun,
};
