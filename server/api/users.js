const router = require('express').Router();
const {
  models: { User, Order, Pun },
} = require('../db');
module.exports = router;
const { isAdmin, adminOrSelf } = require('./gatekeepingMiddleware');

//get user info for admin (attach requireToken and isAdmin to check for auth)

router.get('/admin', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//for a single user to find their own info/admin to access single user info
// attach requireToken
router.get('/:id', adminOrSelf, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

//get open order by userId
router.get('/:id/cart', adminOrSelf, async (req, res, next) => {
  console.log('Here in get cart by user id route');
  try {
    //make sure have requireToken
    const userId = req.params.id;
    console.log(req.params.id, 'req.params');
    //add eager loading to include where items' order id matches
    const order = await Order.findOne({
      where: { userId: userId, status: 'open' },
      include: [
        {
          model: Pun,
        },
      ],
    });
    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.get('/:id/order-history', adminOrSelf, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const response = await User.findAll({
      where: { userId: userId },
      include: [
        {
          model: Pun,
        },
      ],
    });
    console.log(`this is the order history ${response}`);
    res.send(response.data);
  } catch (err) {
    next(err);
  }
});

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      billingAddressName,
      billingAddressStreet,
      billingAddressCity,
      billingAddressState,
      billingAddressZip,
    } = req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      billingAddressName,
      billingAddressStreet,
      billingAddressCity,
      billingAddressState,
      billingAddressZip,
    });
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
});

//create put route for updating user by id
//user should be able to update own profile
//admine should be able to edit any profile
//destructure req.body
router.put('/:id', adminOrSelf, async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      billingAddressName,
      billingAddressStreet,
      billingAddressCity,
      billingAddressState,
      billingAddressZip,
    } = req.body;
    const updatedUser = await User.update({
      firstName,
      lastName,
      email,
      password,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
      billingAddressName,
      billingAddressStreet,
      billingAddressCity,
      billingAddressState,
      billingAddressZip,
    });
    res.status(201).send(updatedUser);
  } catch (error) {
    next(error);
  }
});
