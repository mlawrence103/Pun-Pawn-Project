const router = require('express').Router();
const {
  models: { Order, Pun, LineItem, User },
} = require('../db');

//get order by orderId (useful for guests)
//security: if order has userId, then to access must be associated user or admin
router.get('/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    //add eager loading to include where items' order id matches
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Pun,
          through: {
            where: {
              orderId: orderId,
            },
          },
        },
      ],
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

//create new order
router.post('/', async (req, res, next) => {
  try {
    //make sure getting proper order instance from store
    const {
      status,
      emailAddress,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
    } = req.body;
    let order;
    //if there's a user associated with this order, include it in the new order instance
    if (req.body.userId) {
      const { userId } = req.body;
      const userWithOpenOrder = await User.findByPk(userId, {
        include: [
          {
            model: Order,
            where: {
              status: 'open',
            },
          },
        ],
      });
      //if user already has an open order, do not create new order
      if (userWithOpenOrder) {
        //is this the proper way to reference this?
        throw new Error('You cannot create more than one open order per user.');
      }
      order = await Order.create({
        status,
        emailAddress,
        shippingAddressName,
        shippingAddressStreet,
        shippingAddressCity,
        shippingAddressState,
        shippingAddressZip,
        userId,
      }); //destructured
    } else {
      //if guest cart, create new order without userId
      order = await Order.create({
        status,
        emailAddress,
        shippingAddressName,
        shippingAddressStreet,
        shippingAddressCity,
        shippingAddressState,
        shippingAddressZip,
      }); //destructured
    }
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

//**OPEN ORDER ROUTES */

router.post('/addToCart', async (req, res, next) => {
  try {
    const { punId, orderId, qty, price } = req.body;
    const lineItem = await LineItem.create({
      quantity: qty,
      price: price,
      orderId: orderId,
      punId: punId,
    });
    res.status(201).json(lineItem);
  } catch (error) {
    next(error);
  }
});

router.delete('/deleteItem', async (req, res, next) => {
  try {
    const item = await LineItem.findOne({
      where: {
        punId: req.body.punId,
        orderId: req.body.orderId,
      },
    });
    await item.destroy();
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put('/editLineItem', async (req, res, next) => {
  try {
    const { punId, orderId, quantity } = req.body;
    const item = await LineItem.findOne({
      where: {
        punId: punId,
        orderId: orderId,
      },
    });
    await item.update({
      quantity: quantity,
    });
    res.sendStatus(202);
  } catch (error) {
    next(error);
  }
});

router.put('/:orderId/checkout', async (req, res, next) => {
  try {
    const {
      emailAddress,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
    } = req.body;
    const order = await Order.findByPk(req.params.orderId);
    await order.update({
      emailAddress,
      shippingAddressName,
      shippingAddressStreet,
      shippingAddressCity,
      shippingAddressState,
      shippingAddressZip,
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.put('/:orderId/submit', async (req, res, next) => {
  try {
    const order = await Order.findByPk(req.params.orderId);
    await order.update({
      status: 'fulfilled',
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
