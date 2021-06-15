'use strict';

const { db } = require('../server/db');
const Order = require('../server/db/models/order');
const User = require('../server/db/models/user');
const Pun = require('../server/db/models/pun');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const user1 = await User.create({
    firstName: 'Brenda',
    lastName: 'Wong',
    email: 'brenda.wong@gmail.com',
    password: '123',
    shippingAddressName: 'Brenda Wong',
    shippingAddressStreet: '123 Sesame St.',
    shippingAddressCity: 'New York City',
    shippingAddressState: 'NY',
    shippingAddressZip: '10036',
    billingAddressName: 'Brenda Wong',
    billingAddressStreet: '123 Sesame St.',
    billingAddressCity: 'New York City',
    billingAddressState: 'NY',
    billingAddressZip: '10036',
    userType: 'ADMIN',
  });

  const pun1 = await Pun.create({
    content: 'pretty fly for a wifi',
    author: 'Ben Rodriguez',
    price: 25.0,
    quantity: 3,
  });

  const order1 = await Order.create({
    status: 'open',
    emailAddress: 'brenda.wong@gmail.com',
    shippingAddressName: 'Brenda Wong',
    shippingAddressStreet: '123 Sesame St.',
    shippingAddressCity: 'New York City',
    shippingAddressState: 'NY',
    shippingAddressZip: '10036',
  });

  // console.log(`seeded ${users.length} users`);
  // console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
